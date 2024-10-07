import { Router } from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
  dispatchMaterial,
} from "../controllers/component.controller.js";

const router = Router();

router.route("/").post(create).get(getAll).put(dispatchMaterial);
router.route("/:id").put(update).get(get).delete(remove);
export default router;
