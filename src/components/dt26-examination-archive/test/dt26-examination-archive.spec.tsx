import { newSpecPage } from '@stencil/core/testing';
import { Dt26ExaminationArchive } from '../dt26-examination-archive';
import { ConsultationEntry } from '../../../api/ambulance-ufe';
import fetchMock from 'jest-fetch-mock';

describe('dt26-examination-archive', () => {
  const sampleEntries: ConsultationEntry[] = [
    {
      id: 'c010',
      patientId: '460527-eva-blahova',
      patientName: 'Eva Blahová',
      condition: 'Hypertenzia',
      status: 'closed',
      createdAt: new Date('2038-12-24T10:05:00Z'),
    },
  ];

  let delay = async (ms: number) => await new Promise<void>(resolve => setTimeout(() => resolve(), ms));

  beforeAll(() => { fetchMock.enableMocks(); });
  afterEach(() => { fetchMock.resetMocks(); });

  it('renders archive entries from API', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleEntries));
    const page = await newSpecPage({
      components: [Dt26ExaminationArchive],
      html: `<dt26-examination-archive ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-examination-archive>`,
    });
    await delay(300);
    await page.waitForChanges();
    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(items.length).toEqual(1);
  });

  it('shows error on network failure', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));
    const page = await newSpecPage({
      components: [Dt26ExaminationArchive],
      html: `<dt26-examination-archive ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-examination-archive>`,
    });
    await delay(300);
    await page.waitForChanges();
    const error = page.root.shadowRoot.querySelector('.error');
    expect(error).not.toBeNull();
  });
});
