import express from "express";
import { ClientsService } from "../services/clients";
import { authenticate } from "../middleware/auth";

const router = express.Router();
const clientsService = new ClientsService();

// GET /api/v1/clients
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { search, status, type } = req.query;
    const clients = await clientsService.getClients({
      search: typeof search === 'string' ? search : undefined,
      status: typeof status === 'string' ? status : undefined,
      type: typeof type === 'string' ? type : undefined,
    });
    res.json({ success: true, data: clients });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/clients/:id
router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    await clientsService.deleteClient(id);
    res.json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/clients/:id/archive
router.patch("/:id/archive", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    await clientsService.archiveClient(id);
    res.json({ success: true, message: "Client archived successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
