import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dt-heading',
  styleUrl: 'dt-heading.css',
  shadow: true,
})
export class DtHeading {
  render() {
    return (
      <Host>
        <h1>Ambulance UFE</h1>
      </Host>
    );
  }
}
