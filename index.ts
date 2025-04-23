import { placeOrder } from "./zerodha-init";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// placeOrder("ITC", 1, 'BUY');

const server = new McpServer({
    name: 'trade-bot',
    version: '1.0.0'
})

server.tool("but-stock", 
    {stock: z.string(), qty: z.number()},
    async ({stock, qty}) => {
        placeOrder(stock, qty, 'BUY');
        return {
            content: [{ type: 'text', text: 'Stock has benn bought'}]
        }
    }
)

server.tool("sell-stock", 
    {stock: z.string(), qty: z.number()},
    async ({stock, qty}) => {
        placeOrder(stock, qty, 'SELL');
        return {
            content: [{ type: 'text', text: 'Stock has benn sold'}]
        }
    }
)

const transport = new StdioServerTransport();
await server.connect(transport);