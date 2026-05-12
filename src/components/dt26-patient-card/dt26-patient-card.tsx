import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { AmbulanceRemoteConsultationApi, ConsultationEntry, Configuration } from '../../api/ambulance-ufe';

@Component({
  tag: 'dt26-patient-card',
  styleUrl: 'dt26-patient-card.css',
  shadow: true,
})
export class Dt26PatientCard {
  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  @Prop() entryId: string;
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  @State() patient: ConsultationEntry;
  @State() errorMessage: string;
  @State() isEditing: boolean = false;
  @State() editName: string = '';
  @State() editCondition: string = '';
  @State() editStatus: string = '';

  async componentWillLoad() {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);
      const response = await api.getConsultationEntryRaw({
        ambulanceId: this.ambulanceId,
        entryId: this.entryId,
      });
      if (response.raw.status < 299) {
        this.patient = await response.value();
      } else {
        this.errorMessage = `Cannot retrieve patient: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve patient: ${err.message || "unknown"}`;
    }
  }

  private startEditing() {
    this.editName = this.patient.patientName;
    this.editCondition = this.patient.condition || '';
    this.editStatus = this.patient.status;
    this.isEditing = true;
  }

  private async saveEdits() {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);
      const updated: ConsultationEntry = {
        ...this.patient,
        patientName: this.editName,
        condition: this.editCondition,
        status: this.editStatus as ConsultationEntry['status'],
      };
      const response = await api.updateConsultationEntryRaw({
        ambulanceId: this.ambulanceId,
        entryId: this.entryId,
        consultationEntry: updated,
      });
      if (response.raw.status < 299) {
        this.patient = await response.value();
        this.isEditing = false;
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
          <md-filled-button onclick={() => this.editorClosed.emit('close')}>Späť</md-filled-button>
        </Host>
      );
    }

    if (!this.patient) {
      return <Host><div>Načítavam...</div></Host>;
    }

    if (this.isEditing) {
      return (
        <Host>
          <div class="header">
            <md-icon>edit</md-icon>
            <h2>Upraviť konzultáciu</h2>
          </div>
          <md-divider></md-divider>

          <div class="field">
            <md-outlined-text-field label="Meno pacienta" required
              value={this.editName}
              oninput={(e: any) => { this.editName = e.target.value; }}>
            </md-outlined-text-field>
          </div>

          <div class="field">
            <md-outlined-text-field label="Diagnóza"
              value={this.editCondition}
              oninput={(e: any) => { this.editCondition = e.target.value; }}>
            </md-outlined-text-field>
          </div>

          <div class="field">
            <label>Stav</label>
            <md-outlined-select value={this.editStatus}
              onChange={(e: any) => { this.editStatus = e.target.value; }}>
              <md-select-option value="active">Aktívna</md-select-option>
              <md-select-option value="pending">Čakajúca</md-select-option>
              <md-select-option value="closed">Uzatvorená</md-select-option>
            </md-outlined-select>
          </div>

          <div class="actions">
            <md-filled-button onclick={() => this.saveEdits()}>
              <md-icon slot="icon">save</md-icon>
              Uložiť
            </md-filled-button>
            <md-text-button onclick={() => { this.isEditing = false; }}>
              Zrušiť
            </md-text-button>
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class="header">
          <md-icon>person</md-icon>
          <h2>{this.patient.patientName}</h2>
          <span class="status-badge">{this.patient.status}</span>
        </div>
        <md-divider></md-divider>

        <div class="section">
          <h3>ID pacienta</h3>
          <p>{this.patient.patientId}</p>
        </div>

        <div class="section">
          <h3>Diagnóza</h3>
          <md-list>
            <md-list-item>
              <div slot="headline">{this.patient.condition || '—'}</div>
              <md-icon slot="start">medical_information</md-icon>
            </md-list-item>
          </md-list>
        </div>

        <div class="section">
          <h3>Dátum vytvorenia</h3>
          <p>{this.patient.createdAt?.toLocaleString()}</p>
        </div>

        <div class="actions">
          <md-filled-button onclick={() => this.editorClosed.emit('protocol')}>
            <md-icon slot="icon">description</md-icon>
            Protokol
          </md-filled-button>
          <md-outlined-button onclick={() => this.startEditing()}>
            <md-icon slot="icon">edit</md-icon>
            Upraviť
          </md-outlined-button>
          <md-text-button onclick={() => this.editorClosed.emit('close')}>
            <md-icon slot="icon">arrow_back</md-icon>
            Späť
          </md-text-button>
        </div>
      </Host>
    );
  }
}
