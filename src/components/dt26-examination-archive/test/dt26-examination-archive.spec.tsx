import { newSpecPage } from '@stencil/core/testing';
import { Dt26ExaminationArchive } from '../dt26-examination-archive';

describe('dt26-examination-archive', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Dt26ExaminationArchive],
      html: `<dt26-examination-archive></dt26-examination-archive>`,
    });
    expect(page.root).toEqualHtml(`
      <dt26-examination-archive>
        <mock:shadow-root>
          <h2>Archív vyšetrení</h2>
          <md-list>
            <md-list-item>
              <div slot="headline">Eva Blahová</div>
              <div slot="supporting-text">Liečba úspešne ukončená. Odporúčaná kontrola za 6 mesiacov.</div>
              <md-icon slot="start">folder_open</md-icon>
              <div class="actions" slot="end">
                <md-icon-button><md-icon>edit</md-icon></md-icon-button>
                <md-icon-button><md-icon>archive</md-icon></md-icon-button>
                <md-icon-button><md-icon>delete</md-icon></md-icon-button>
              </div>
            </md-list-item>
            <md-list-item>
              <div slot="headline">Tomáš Baláž</div>
              <div slot="supporting-text">Stav stabilizovaný, bez potreby ďalšej liečby.</div>
              <md-icon slot="start">archive</md-icon>
              <div class="actions" slot="end">
                <md-icon-button><md-icon>edit</md-icon></md-icon-button>
                <md-icon-button><md-icon>unarchive</md-icon></md-icon-button>
                <md-icon-button><md-icon>delete</md-icon></md-icon-button>
              </div>
            </md-list-item>
          </md-list>
        </mock:shadow-root>
      </dt26-examination-archive>
    `);
  });
});
