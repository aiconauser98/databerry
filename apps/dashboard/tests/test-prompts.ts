import pMap from 'p-map';

import AgentManager from '@chaindesk/lib/agent';
import { prisma } from '@chaindesk/prisma/client';

const customerSupportDataset = [
  {
    question: 'Qui est tu?',
  },
  {
    question: '¿eres mi amigo?',
  },
  {
    question: "C'est quoi chaindesk?",
  },
  {
    question: '什么是 chaindesk.ai？',
  },
  {
    question: 'Combien ca coute?',
  },
  {
    question: 'Comment créer un site internet?',
  },
  {
    question: "Est-il possible d'evaluer la réponse des agents?",
  },
];

(async () => {
  const agent = await prisma.agent.findUnique({
    where: {
      id: 'cloisatop00080u2u5cuzwphg',
    },
    include: {
      tools: {
        include: {
          datastore: true,
        },
      },
    },
  });

  const manager = new AgentManager({
    agent: agent as any,
  });

  await pMap(
    customerSupportDataset,
    async ({ question }) => {
      const { answer } = await manager.query({
        input: question,
      });

      console.log(`---\n${question}: ${answer}\n`);
    },
    {
      concurrency: 1,
    }
  );
})();
