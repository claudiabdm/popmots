import { WordEntries } from "../../../src/types";
import { formatEntry, replacer } from "../../_utils";

export async function onRequestGet({ env }) {
    const object = await env.DICTIONARY.get('dictionary');

    if (object === null) {
        return new Response("Object Not Found", { status: 404 });
    }

    return new Response(object.body)
}