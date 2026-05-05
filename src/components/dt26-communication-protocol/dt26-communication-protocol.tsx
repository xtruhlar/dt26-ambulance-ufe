import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

type ProtocolStatus = 'open' | 'in-progress' | 'closed';

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

  @State() content: string = '';
  @State() status: ProtocolStatus = 'open';
  @State() saved: boolean = false;

  private isNew() {
    return !this.entryId || this.entryId === '@new';
  }

  private handleSave() {
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }

  render() {
    return (
      <Host>
        <h2>{this.isNew() ? 'Nový protokol vyšetrenia' : 'Upraviť protokol'}</h2>
        <div class="field">
          <md-outlined-text-field
            label="Obsah komunikácie"
            type="textarea"
            rows={6}
            value={this.content}
            onInput={(e: any) => (this.content = e.target.value)}
          ></md-outlined-text-field>
        </div>
        <div class="field">
          <label>Stav</label>
          <md-outlined-select value={this.status} onChange={(e: any) => (this.status = e.target.value)}>
            <md-select-option value="open">Otvorený</md-select-option>
            <md-select-option value="in-progress">Prebieha</md-select-option>
            <md-select-option value="closed">Uzatvorený</md-select-option>
          </md-outlined-select>
        </div>
        {this.saved && <div class="saved-msg">Uložené!</div>}
        <div class="actions">
          <md-filled-button onclick={() => this.handleSave()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
          <md-text-button onclick={() => this.editorClosed.emit('close')}>
            Zrušiť
          </md-text-button>
        </div>
      </Host>
    );
  }
}