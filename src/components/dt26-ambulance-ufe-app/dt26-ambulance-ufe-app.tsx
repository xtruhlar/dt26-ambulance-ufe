import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'dt26-ambulance-ufe-app',
  styleUrl: 'dt26-ambulance-ufe-app.css',
  shadow: true,
})
export class Dt26AmbulanceUfeApp {
  @State() private relativePath = "";
  @Prop() basePath: string = "";

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = "";
      }
    };

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      toRelative(new URL((ev as any).destination.url).pathname);
    });

    toRelative(location.pathname);
  }

  render() {
    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute);
    };

    if (this.relativePath.startsWith("patient/")) {
      const entryId = this.relativePath.split("/")[1];
      return (
        <Host>
          <dt26-patient-card entry-id={entryId}
            oneditor-closed={() => navigate("./list")}>
          </dt26-patient-card>
        </Host>
      );
    }

    if (this.relativePath.startsWith("protocol/")) {
      const entryId = this.relativePath.split("/")[1];
      return (
        <Host>
          <dt26-communication-protocol entry-id={entryId}
            oneditor-closed={() => navigate("./list")}>
          </dt26-communication-protocol>
        </Host>
      );
    }

    if (this.relativePath.startsWith("archive")) {
      return (
        <Host>
          <dt26-examination-archive></dt26-examination-archive>
        </Host>
      );
    }

    return (
      <Host>
        <dt26-remote-consultation-list
          onentry-clicked={(ev: CustomEvent<string>) =>
            navigate(ev.detail === '@new' ? "./protocol/@new" : "./patient/" + ev.detail)
          }>
        </dt26-remote-consultation-list>
      </Host>
    );
  }
}