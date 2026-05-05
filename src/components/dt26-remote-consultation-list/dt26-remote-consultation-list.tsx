import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { AmbulanceRemoteConsultationApi, ConsultationEntry, Configuration } from '../../api/ambulance-ufe';

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

  consultations: ConsultationEntry[];

  private async getConsultationsAsync(): Promise<ConsultationEntry[]> {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);
      const response = await api.getConsultationEntriesRaw({ ambulanceId: this.ambulanceId });
      if (response.raw.status < 299) {
        return await response.value();
      } else {
        this.errorMessage = `Cannot retrieve consultations: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve consultations: ${err.message || "unknown"}`;
    }
    return [];
  }

  async componentWillLoad() {
    this.consultations = await this.getConsultationsAsync();
  }

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