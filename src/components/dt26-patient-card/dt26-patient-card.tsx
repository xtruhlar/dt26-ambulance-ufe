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

    return (
      <Host>
        <div class="header">
          <md-icon>person</md-icon>
          <h2>{this.patient.patientName}</h2>
          <span class="dob">Stav: {this.patient.status}</span>
        </div>
        <md-divider></md-divider>
        <div class="section">
          <h3>Diagnóza</h3>
          <md-list>
            <md-list-item>
              <div slot="headline">{this.patient.condition}</div>
              <md-icon slot="start">medical_information</md-icon>
            </md-list-item>
          </md-list>
        </div>
        <div class="section">
          <h3>Dátum vytvorenia</h3>
          <p>{this.patient.createdAt?.toLocaleString()}</p>
        </div>
        <div class="actions">
          <md-filled-button onclick={() => this.editorClosed.emit('close')}>
            <md-icon slot="icon">arrow_back</md-icon>
            Späť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}