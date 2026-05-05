import { newSpecPage } from '@stencil/core/testing';
import { Dt26CommunicationProtocol } from '../dt26-communication-protocol';

describe('dt26-communication-protocol', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Dt26CommunicationProtocol],
      html: `<dt26-communication-protocol></dt26-communication-protocol>`,
    });
    expect(page.root).toEqualHtml(`
      <dt26-communication-protocol>
        <mock:shadow-root>
          <h2>Nový protokol vyšetrenia</h2>
          <div class="field">
            <md-outlined-text-field label="Obsah komunikácie" rows="6" type="textarea" value=""></md-outlined-text-field>
          </div>
          <div class="field">
            <label>Stav</label>
            <md-outlined-select value="open">
              <md-select-option value="open">Otvorený</md-select-option>
              <md-select-option value="in-progress">Prebieha</md-select-option>
              <md-select-option value="closed">Uzatvorený</md-select-option>
            </md-outlined-select>
          </div>
          <div class="actions">
            <md-filled-button>
              <md-icon slot="icon">save</md-icon>
              Uložiť
            </md-filled-button>
            <md-text-button>Zrušiť</md-text-button>
          </div>
        </mock:shadow-root>
      </dt26-communication-protocol>
    `);
  });
});
