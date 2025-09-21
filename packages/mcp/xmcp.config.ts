import { type XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  stdio: true,
  paths: {
    prompts: false,
    tools: true,
  },
};

export default config;
