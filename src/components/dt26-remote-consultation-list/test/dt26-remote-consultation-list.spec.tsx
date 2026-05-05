import { newSpecPage } from '@stencil/core/testing';
import { Dt26RemoteConsultationList } from '../dt26-remote-consultation-list';
import { ConsultationEntry } from '../../../api/ambulance-ufe/models';
import fetchMock from 'jest-fetch-mock';

describe('dt26-remote-consultation-list', () => {

  const sampleEntries: ConsultationEntry[] = [
    {
      id: "c001",
      patientId: "460527-jan-novak",
      patientName: "Ján Novák",
      condition: "Hypertenzia",
      status: "active",
      createdAt: new Date("2038-12-24T10:05:00Z"),
    },
    {
      id: "c002",
      patientId: "780907-maria-kovacova",
      patientName: "Mária Kováčová",
      condition: "Diabetes typu 2",
      status: "pending",
      createdAt: new Date("2038-12-24T10:25:00Z"),
    }
  ];

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders sample entries', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleEntries));

    const page = await newSpecPage({
      components: [Dt26RemoteConsultationList],
      html: `<dt26-remote-consultation-list ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-remote-consultation-list>`,
    });

    const instance = page.rootInstance as Dt26RemoteConsultationList;
    const expectedCount = instance?.consultations?.length;

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(expectedCount).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedCount);
  });

  it('renders error message on network issues', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));

    const page = await newSpecPage({
      components: [Dt26RemoteConsultationList],
      html: `<dt26-remote-consultation-list ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-remote-consultation-list>`,
    });

    const instance = page.rootInstance as Dt26RemoteConsultationList;
    const expectedCount = instance?.consultations?.length;

    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelectorAll(".error");
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(errorMessage.length).toBeGreaterThanOrEqual(1);
    expect(expectedCount).toEqual(0);
    expect(items.length).toEqual(expectedCount);
  });
});