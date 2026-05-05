import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

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

  private mockPatients = {
    '1': { name: 'Ján Novák', dob: '1965-03-12', conditions: ['Hypertenzia', 'Ischemická choroba srdca'], allergies: 'Penicilín', notes: 'Pacient užíva betablokátory.' },
    '2': { name: 'Mária Kováčová', dob: '1978-07-24', conditions: ['Diabetes typu 2'], allergies: 'Žiadne', notes: 'Pravidelná kontrola glykémie.' },
    '3': { name: 'Peter Horváth', dob: '1990-11-05', conditions: ['Astma'], allergies: 'Aspirin', notes: 'Nosí záchranný inhalátor.' },
  };

  render() {
    const patient = this.mockPatients[this.entryId];

    if (!patient) {
      return (
        <Host>
          <div class="error">Pacient nenájdený</div>
          <md-filled-button onclick={() => this.editorClosed.emit('close')}>Späť</md-filled-button>
        </Host>
      );
    }

    return (
      <Host>
        <div class="header">
          <md-icon>person</md-icon>
          <h2>{patient.name}</h2>
          <span class="dob">Dátum narodenia: {patient.dob}</span>
        </div>
        <md-divider></md-divider>
        <div class="section">
          <h3>Diagnózy</h3>
          <md-list>
            {patient.conditions.map(c =>
              <md-list-item>
                <div slot="headline">{c}</div>
                <md-icon slot="start">medical_information</md-icon>
              </md-list-item>
            )}
          </md-list>
        </div>
        <div class="section">
          <h3>Alergie</h3>
          <p>{patient.allergies}</p>
        </div>
        <div class="section">
          <h3>Poznámky</h3>
          <p>{patient.notes}</p>
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