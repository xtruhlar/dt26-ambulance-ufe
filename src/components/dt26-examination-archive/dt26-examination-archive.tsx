import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

interface ArchiveEntry {
  id: string;
  patientName: string;
  finalReport: string;
  archivedAt: Date;
  archived: boolean;
}

@Component({
  tag: 'dt26-examination-archive',
  styleUrl: 'dt26-examination-archive.css',
  shadow: true,
})
export class Dt26ExaminationArchive {
  @Event({ eventName: 'entry-clicked' }) entryClicked: EventEmitter<string>;

  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  @State() entries: ArchiveEntry[] = [
    { id: '10', patientName: 'Eva Blahová', finalReport: 'Liečba úspešne ukončená. Odporúčaná kontrola za 6 mesiacov.', archivedAt: new Date('2025-04-10'), archived: false },
    { id: '11', patientName: 'Tomáš Baláž', finalReport: 'Stav stabilizovaný, bez potreby ďalšej liečby.', archivedAt: new Date('2025-04-15'), archived: true },
  ];

  @State() editingId: string | null = null;
  @State() editReport: string = '';

  private startEdit(entry: ArchiveEntry) {
    this.editingId = entry.id;
    this.editReport = entry.finalReport;
  }

  private saveEdit() {
    this.entries = this.entries.map(e =>
      e.id === this.editingId ? { ...e, finalReport: this.editReport } : e
    );
    this.editingId = null;
  }

  private deleteEntry(id: string) {
    this.entries = this.entries.filter(e => e.id !== id);
  }

  private toggleArchive(id: string) {
    this.entries = this.entries.map(e =>
      e.id === id ? { ...e, archived: !e.archived } : e
    );
  }

  render() {
    return (
      <Host>
        <h2>Archív vyšetrení</h2>
        <md-list>
          {this.entries.map(entry =>
            <md-list-item>
              <div slot="headline">{entry.patientName}</div>
              <div slot="supporting-text">
                {this.editingId === entry.id
                  ? <md-outlined-text-field
                      value={this.editReport}
                      onInput={(e: any) => (this.editReport = e.target.value)}
                    ></md-outlined-text-field>
                  : entry.finalReport
                }
              </div>
              <md-icon slot="start">{entry.archived ? 'archive' : 'folder_open'}</md-icon>
              <div slot="end" class="actions">
                {this.editingId === entry.id
                  ? <md-icon-button onclick={() => this.saveEdit()}><md-icon>save</md-icon></md-icon-button>
                  : <md-icon-button onclick={() => this.startEdit(entry)}><md-icon>edit</md-icon></md-icon-button>
                }
                <md-icon-button onclick={() => this.toggleArchive(entry.id)}>
                  <md-icon>{entry.archived ? 'unarchive' : 'archive'}</md-icon>
                </md-icon-button>
                <md-icon-button onclick={() => this.deleteEntry(entry.id)}>
                  <md-icon>delete</md-icon>
                </md-icon-button>
              </div>
            </md-list-item>
          )}
        </md-list>
      </Host>
    );
  }
}