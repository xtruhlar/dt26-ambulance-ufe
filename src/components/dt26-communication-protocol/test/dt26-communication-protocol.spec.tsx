import { newSpecPage } from '@stencil/core/testing';
import { Dt26CommunicationProtocol } from '../dt26-communication-protocol';
import { ConsultationEntry, CommunicationProtocol } from '../../../api/ambulance-ufe';
import fetchMock from 'jest-fetch-mock';

describe('dt26-communication-protocol', () => {
  const sampleEntry: ConsultationEntry = {
    id: 'c001',
    patientId: '460527-jan-novak',
    patientName: 'Ján Novák',
    condition: 'Hypertenzia',
    status: 'active',
    createdAt: new Date('2038-12-24T10:05:00Z'),
  };

  const sampleProtocol: CommunicationProtocol = {
    id: 'p001',
    entryId: 'c001',
    content: 'Pacient uvádza bolesti hlavy.',
    status: 'open',
  };

  let delay = async (ms: number) => await new Promise<void>(resolve => setTimeout(() => resolve(), ms));

  beforeAll(() => { fetchMock.enableMocks(); });
  afterEach(() => { fetchMock.resetMocks(); });

  it('renders new entry form for @new', async () => {
    const page = await newSpecPage({
      components: [Dt26CommunicationProtocol],
      html: `<dt26-communication-protocol entry-id="@new" ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-communication-protocol>`,
    });
    await page.waitForChanges();
    const fields = page.root.shadowRoot.querySelectorAll('md-outlined-text-field');
    expect(fields.length).toBeGreaterThanOrEqual(1);
  });

  it('renders protocol form for existing entry', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(sampleEntry), { status: 200 }],
      [JSON.stringify(sampleProtocol), { status: 200 }],
    );
    const page = await newSpecPage({
      components: [Dt26CommunicationProtocol],
      html: `<dt26-communication-protocol entry-id="c001" ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-communication-protocol>`,
    });
    await delay(300);
    await page.waitForChanges();
    const instance = page.rootInstance as Dt26CommunicationProtocol;
    expect(instance.protocol?.content).toEqual(sampleProtocol.content);
  });

  it('shows error on network failure', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));
    const page = await newSpecPage({
      components: [Dt26CommunicationProtocol],
      html: `<dt26-communication-protocol entry-id="c001" ambulance-id="dt26-ambulance" api-base="http://test/api"></dt26-communication-protocol>`,
    });
    await delay(300);
    await page.waitForChanges();
    const error = page.root.shadowRoot.querySelector('.error');
    expect(error).not.toBeNull();
  });
});