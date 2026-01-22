const { z } = require("zod");

exports.mongoIdParam = z.object({
  id: z.string().length(24, "Invalid ID format"),
});
