import { Component, Host, Prop, State, h } from '@stencil/core';
import { AmbulanceRemoteConsultationApi, ConsultationEntry, Configuration } from '../../api/ambulance-ufe';

@Component({
  tag: 'dt26-examination-archive',
  styleUrl: 'dt26-examination-archive.css',
  shadow: true,
})
export class Dt26ExaminationArchive {
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  @State() entries: ConsultationEntry[] = [];
  @State() errorMessage: string;
  @State() editingId: string | null = null;
  @State() editCondition: string = '';

  async componentWillLoad() {
    await this.loadEntries();
  }

  private async loadEntries() {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);
      const response = await api.getConsultationEntriesRaw({ ambulanceId: this.ambulanceId });
      if (response.raw.status < 299) {
        const all = await response.value();
        this.entries = all.filter(e => e.status === 'closed');
      } else {
        this.errorMessage = `Cannot retrieve archive: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve archive: ${err.message || 'unknown'}`;
    }
  }

  private startEdit(entry: ConsultationEntry) {
    this.editingId = entry.id;
    this.editCondition = entry.condition;
  }

  private async saveEdit(entry: ConsultationEntry) {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);
      const updated = { ...entry, condition: this.editCondition };
      const response = await api.updateConsultationEntryRaw({
        ambulanceId: this.ambulanceId,
        entryId: entry.id,
        consultationEntry: updated,
      });
      if (response.raw.status < 299) {
        this.entries = this.entries.map(e => e.id === entry.id ? updated : e);
        this.editingId = null;
      } else {
        this.errorMessage = `Cannot update: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot update: ${err.message || 'unknown'}`;
    }
  }

  private async deleteEntry(id: string) {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const api = new AmbulanceRemoteConsultationApi(configuration);
      const response = await api.deleteConsultationEntryRaw({ ambulanceId: this.ambulanceId, entryId: id });
      if (response.raw.status < 299) {
        this.entries = this.entries.filter(e => e.id !== id);
      } else {
        this.errorMessage = `Cannot delete: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot delete: ${err.message || 'unknown'}`;
    }
  }

  render() {
    return (
      <Host>
        <h2>Archív vyšetrení</h2>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          : <md-list>
              {this.entries.map(entry =>
                <md-list-item>
                  <div slot="headline">{entry.patientName}</div>
                  <div slot="supporting-text">
                    {this.editingId === entry.id
                      ? <md-outlined-text-field value={this.editCondition}
                          onInput={(e: any) => (this.editCondition = e.target.value)}>
                        </md-outlined-text-field>
                      : entry.condition
                    }
                  </div>
                  <md-icon slot="start">archive</md-icon>
                  <div slot="end" class="actions">
                    {this.editingId === entry.id
                      ? <md-icon-button onclick={() => this.saveEdit(entry)}><md-icon>save</md-icon></md-icon-button>
                      : <md-icon-button onclick={() => this.startEdit(entry)}><md-icon>edit</md-icon></md-icon-button>
                    }
                    <md-icon-button onclick={() => this.deleteEntry(entry.id)}>
                      <md-icon>delete</md-icon>
                    </md-icon-button>
                  </div>
                </md-list-item>
              )}
            </md-list>
        }
      </Host>
    );
  }
}