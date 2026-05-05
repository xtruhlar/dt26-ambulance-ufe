import { newSpecPage } from '@stencil/core/testing';
import { Dt26RemoteConsultationList } from '../dt26-remote-consultation-list';

describe('dt26-remote-consultation-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Dt26RemoteConsultationList],
      html: `<dt26-remote-consultation-list></dt26-remote-consultation-list>`,
    });
    expect(page.root).toEqualHtml(`
      <dt26-remote-consultation-list>
        <mock:shadow-root>
          <md-list>
            <md-list-item>
              <div slot="headline">Ján Novák</div>
              <div slot="supporting-text">Hypertenzia — active</div>
              <md-icon slot="start">video_call</md-icon>
            </md-list-item>
            <md-list-item>
              <div slot="headline">Mária Kováčová</div>
              <div slot="supporting-text">Diabetes typu 2 — pending</div>
              <md-icon slot="start">video_call</md-icon>
            </md-list-item>
            <md-list-item>
              <div slot="headline">Peter Horváth</div>
              <div slot="supporting-text">Astma — active</div>
              <md-icon slot="start">video_call</md-icon>
            </md-list-item>
          </md-list>
          <md-filled-icon-button class="add-button">
            <md-icon>add</md-icon>
          </md-filled-icon-button>
        </mock:shadow-root>
      </dt26-remote-consultation-list>
    `);
  });
});
