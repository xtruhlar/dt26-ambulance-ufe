import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

interface ConsultationEntry {
  id: string;
  patientName: string;
  condition: string;
  status: 'active' | 'pending' | 'closed';
  createdAt: Date;
}

@Component({
  tag: 'dt26-remote-consultation-list',
  styleUrl: 'dt26-remote-consultation-list.css',
  shadow: true,
})
export class Dt26RemoteConsultationList {
  @Event({ eventName: 'entry-clicked' }) entryClicked: EventEmitter<string>;

  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  private consultations: ConsultationEntry[] = [
    { id: '1', patientName: 'Ján Novák', condition: 'Hypertenzia', status: 'active', createdAt: new Date('2025-05-01') },
    { id: '2', patientName: 'Mária Kováčová', condition: 'Diabetes typu 2', status: 'pending', createdAt: new Date('2025-05-02') },
    { id: '3', patientName: 'Peter Horváth', condition: 'Astma', status: 'active', createdAt: new Date('2025-05-03') },
  ];

  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          : <md-list>
              {this.consultations.map(entry =>
                <md-list-item onClick={() => this.entryClicked.emit(entry.id)}>
                  <div slot="headline">{entry.patientName}</div>
                  <div slot="supporting-text">{entry.condition + ' — ' + entry.status}</div>
                  <md-icon slot="start">video_call</md-icon>
                </md-list-item>
              )}
            </md-list>
        }
        <md-filled-icon-button class="add-button" onclick={() => this.entryClicked.emit('@new')}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}