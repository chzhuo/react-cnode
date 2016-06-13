/**
 * Created by zhuo on 16/4/7.
 */
import { normalize, Schema, arrayOf } from "normalizr";

export let authorSchema = new Schema("authors",{idAttribute:"loginname"});
export let topicSchema = new Schema("topics");

topicSchema.define({
    author:authorSchema,
    replies:arrayOf({
        author:authorSchema
    })
});
