import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { AmbulanceRemoteConsultationApi, CommunicationProtocol, ConsultationEntry, Configuration } from '../../api/ambulance-ufe';

@Component({
  tag: 'dt26-communication-protocol',
  styleUrl: 'dt26-communication-protocol.css',
  shadow: true,
})
export class Dt26CommunicationProtocol {
  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  @Prop() entryId: string;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  @State() entry: ConsultationEntry;
  @State() protocol: CommunicationProtocol;
  @State() errorMessage: string;
  @State() isValid: boolean;

  componentWillLoad() {
    this.getDataAsync();
  }

  private async getDataAsync() {
    if (this.entryId === '@new') {
      this.isValid = false;
      this.entry = {
        id: '@new',
        patientId: '',
        patientName: '',
        condition: '',
        status: 'active',
        createdAt: new Date(Date.now()),
      };
      return;
    }

    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);

      const entryResponse = await api.getConsultationEntryRaw({ ambulanceId: this.ambulanceId, entryId: this.entryId });
      if (entryResponse.raw.status < 299) {
        this.entry = await entryResponse.value();
        this.isValid = true;
      } else {
        this.errorMessage = `Cannot retrieve entry: ${entryResponse.raw.statusText}`;
        return;
      }

      const protocolResponse = await api.getConsultationProtocolRaw({ ambulanceId: this.ambulanceId, entryId: this.entryId });
      if (protocolResponse.raw.status < 299) {
        this.protocol = await protocolResponse.value();
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve data: ${err.message || 'unknown'}`;
    }
  }

  private async saveEntry() {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);

      const response = this.entryId === '@new'
        ? await api.createConsultationEntryRaw({ ambulanceId: this.ambulanceId, consultationEntry: this.entry })
        : await api.updateConsultationProtocolRaw({ ambulanceId: this.ambulanceId, entryId: this.entryId, communicationProtocol: this.protocol });

      if (response.raw.status < 299) {
        this.editorClosed.emit('store');
      } else {
        this.errorMessage = `Cannot save: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot save: ${err.message || 'unknown'}`;
    }
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      );
    }

    const isNew = this.entryId === '@new';

    return (
      <Host>
        <h2>{isNew ? 'Nová konzultácia' : 'Protokol vyšetrenia'}</h2>

        {isNew && <div class="field">
          <md-outlined-text-field label="Meno pacienta" required
            value={this.entry?.patientName}
            oninput={(e: any) => { if (this.entry) this.entry.patientName = e.target.value; }}>
          </md-outlined-text-field>
        </div>}

        {isNew && <div class="field">
          <md-outlined-text-field label="Diagnóza"
            value={this.entry?.condition}
            oninput={(e: any) => { if (this.entry) this.entry.condition = e.target.value; }}>
          </md-outlined-text-field>
        </div>}

        {!isNew && <div class="field">
          <md-outlined-text-field label="Obsah komunikácie" type="textarea" rows={6}
            value={this.protocol?.content}
            oninput={(e: any) => { if (this.protocol) this.protocol.content = e.target.value; }}>
          </md-outlined-text-field>
        </div>}

        {!isNew && <div class="field">
          <label>Stav</label>
          <md-outlined-select value={this.protocol?.status}
            onChange={(e: any) => { if (this.protocol) this.protocol.status = e.target.value; }}>
            <md-select-option value="open">Otvorený</md-select-option>
            <md-select-option value="in-progress">Prebieha</md-select-option>
            <md-select-option value="closed">Uzatvorený</md-select-option>
          </md-outlined-select>
        </div>}

        <div class="actions">
          <md-filled-button disabled={!this.entry} onclick={() => this.saveEntry()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
          <md-text-button onclick={() => this.editorClosed.emit('cancel')}>
            Zrušiť
          </md-text-button>
        </div>
      </Host>
    );
  }
}