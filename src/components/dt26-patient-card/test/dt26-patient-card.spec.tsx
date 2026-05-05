import { newSpecPage } from '@stencil/core/testing';
import { Dt26PatientCard } from '../dt26-patient-card';

describe('dt26-patient-card', () => {
  it('renders loading state', async () => {
    const page = await newSpecPage({
      components: [Dt26PatientCard],
      html: `<dt26-patient-card entry-id="c001" ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-patient-card>`,
    });
    expect(page.root).not.toBeNull();
  });
});