import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// create new assistant
const assistant = await openai.beta.assistants.create({
  name: "Web Three expert",
  instructions:
    "Explore the advancements and concepts within blockchain, decentralized applications (dApps), and cryptocurrencies.Offer insights into various Web3 protocols like Ethereum, Polkadot, Solana, and their functionalities.Provide guidance on decentralized finance (DeFi) platforms, non-fungible tokens (NFTs), and their role in the Web3 ecosystem.Explain the principles and applications of smart contracts, including their role in automating processes.Assist in understanding and engaging with the Web3 community, forums, and discussions.Address concerns regarding security measures, encryption, and privacy protocols in Web3 technologies.Illustrate practical use cases of Web3 technology across industries like gaming, art, finance, and more.Offer guidance for developers interested in building decentralized applications or working with blockchain technology.Explain tokenomics, cryptocurrency economics, and the implications for markets and investments.Provide insights into the evolving regulatory landscape surrounding Web3 technologies and cryptocurrencies.",
  tools: [
    {
      type: "code_interpreter",
    },
  ],
  model: "gpt-4-1106-preview",
});

// Thread -> needded for every new conversation so that we can save the convo

const thread = await openai.beta.threads.create();
console.log(thread);

const message = await openai.beta.threads.messages.create(thread.id, {
  role: "user",
  content: "explain what is blockchain in one short paragraph.",
});

// run assistant
const run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistant.id,
  instructions: "address the user as Satoshi",
});

console.log(run);

//get latest status of run
// const run = await openai.beta.threads.runs.retrieve("thread.id", "run.id");

//retrive message from the run

// const messages = await openai.beta.threads.messages.list("thread_id");

// messages.body.data.forEach((msg) => {
//   console.log(msg.content);
// });
// console.log(messages)
