const { z } = require("zod");

exports.paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
