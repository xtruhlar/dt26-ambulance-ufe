import { newSpecPage } from '@stencil/core/testing';
import { Dt26AmbulanceUfeApp } from '../dt26-ambulance-ufe-app';

describe('dt26-ambulance-ufe-app', () => {
  it('renders list by default', async () => {
    const page = await newSpecPage({
      url: `http://localhost/dt26-ambulance-ufe/`,
      components: [Dt26AmbulanceUfeApp],
      html: `<dt26-ambulance-ufe-app base-path="/dt26-ambulance-ufe/"></dt26-ambulance-ufe-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLowerCase()).toEqual('dt26-remote-consultation-list');
  });

  it('renders patient card for patient path', async () => {
    const page = await newSpecPage({
      url: `http://localhost/dt26-ambulance-ufe/patient/1`,
      components: [Dt26AmbulanceUfeApp],
      html: `<dt26-ambulance-ufe-app base-path="/dt26-ambulance-ufe/"></dt26-ambulance-ufe-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLowerCase()).toEqual('dt26-patient-card');
  });

  it('renders protocol for protocol path', async () => {
    const page = await newSpecPage({
      url: `http://localhost/dt26-ambulance-ufe/protocol/@new`,
      components: [Dt26AmbulanceUfeApp],
      html: `<dt26-ambulance-ufe-app base-path="/dt26-ambulance-ufe/"></dt26-ambulance-ufe-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLowerCase()).toEqual('dt26-communication-protocol');
  });

  it('renders archive for archive path', async () => {
    const page = await newSpecPage({
      url: `http://localhost/dt26-ambulance-ufe/archive`,
      components: [Dt26AmbulanceUfeApp],
      html: `<dt26-ambulance-ufe-app base-path="/dt26-ambulance-ufe/"></dt26-ambulance-ufe-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLowerCase()).toEqual('dt26-examination-archive');
  });
});