import type { Express } from "express";
import { type Server } from "http";
// import { storage } from "./storage"; 

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Server is awake" });
  });

  return httpServer;
}