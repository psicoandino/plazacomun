const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function readJson(relativePath) {
    return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

assert(fs.existsSync(path.join(root, "index.html")), "Missing index.html");
assert(fs.existsSync(path.join(root, "post.html")), "Missing reusable post.html");
assert(fs.existsSync(path.join(root, "assets/js/app.js")), "Missing assets/js/app.js");
assert(fs.existsSync(path.join(root, "assets/js/post.js")), "Missing assets/js/post.js");
assert(fs.existsSync(path.join(root, "assets/css/styles.css")), "Missing assets/css/styles.css");

const postsIndex = readJson("data/posts-index.json");
assert(Array.isArray(postsIndex.posts), "posts-index.json must expose posts array");
assert(postsIndex.posts.length > 0, "posts-index.json must list at least one post");

for (const postMeta of postsIndex.posts) {
    assert(/^\d{4}_\d{2}_\d{2}_[a-z0-9-]+$/.test(postMeta.id), `Invalid post id: ${postMeta.id}`);
    assert(postMeta.url === `post.html?id=${postMeta.id}`, `Invalid URL for ${postMeta.id}`);

    const postPath = `content/posts/${postMeta.id}.json`;
    assert(fs.existsSync(path.join(root, postPath)), `Missing post file: ${postPath}`);

    const post = readJson(postPath);
    assert(post.id === postMeta.id, `Post id mismatch in ${postPath}`);
    assert(post.title && post.dek && post.publishedAt, `Post missing required fields: ${postPath}`);
    assert(Array.isArray(post.sections) && post.sections.length > 0, `Post missing sections: ${postPath}`);
}

console.log(`Validated ${postsIndex.posts.length} beta posts.`);
