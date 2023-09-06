const databse = require("./dbManager");
const graphQL = require("./graph");
const bodyParser = require("body-parser");
const pswManagement = require("./pswMgmt");
const { generateAccessToken, authenticateToken } = require("./authUser");

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const mongoUSER = "bartyslr";
const mongoPass = "W4MZeyrsSEFJnilc";
const mongoURI = `mongodb+srv://${mongoUSER}:${mongoPass}@cluster69.7tz3qnk.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "temp";
const collectionMongo = "blog1";

const dbConnection = new databse.dbMan(collectionMongo, dbName);

const app = express();
const PORT = "80";

const root = {
  searchPosts: async (args) => {
    return await searchDb(
      "posts",
      args.keywords,
      ["title", "slug", "content"],
      "images",
      "slug",
      "title"
    );
  },
  searchSlugs: async (args) => {
    return await getSlug(args.keywords);
  },
  getLabelsOfPost: async (args) => {
    return await getStuffOfThisPost("labels", args.slug);
  },
  getCommentsOfPost: async (args) => {
    return await getStuffOfThisPost("comments", args.slug);
  },
  getAuthsOfPost: async (args) => {
    return await getStuffOfThisPost("authors", args.slug);
  },
  getFullPost: async (args) => {
    return await getFullSingle("posts", args.slug);
  },
  getFullPage: async (args) => {
    return await getFullSingle("pages", args.slug);
  },
  getAllFullPosts: async () => {
    return await readAllCollections("posts");
  },

  addNewPost: async (args) => {
    await writeNewPost(
      args.slug,
      args.title,
      args.content,
      args.labels,
      args.date,
      args.author,
      args.images,
      args.status
    );
  },
  addNewComment: async (args) => {
    comment = {};

    comment["slug"] = args.slug;
    comment["username"] = args.username;
    comment["content"] = args.content;
    comment["date"] = args.date;
    comment["status"] = args.status;

    return await addNewCommentDb(comment);
  },
  registerUser: async (args) => {
    console.log({ email: args.email });
    if (await countCollection("authors", { email: args.email })) {
      return "Email is already registred";
    }
    if (await countCollection("authors", { username: args.username })) {
      return "Username is already registred";
    }
    return await registerNewUser(args.email, args.password, args.username);
  },
  getCountPosts: async () => {
    return await countCollection("posts");
  },
  getCountComments: async (args) => {
    return await countCollection("comments", { slug: args.slug });
  },
  countAllComments: async () => {
    return await countCollection("comments");
  },
  getLabelCount: async (args) => {
    return await countCollection("labels", { slug: args.label });
  },
  getAuthorCount: async (args) => {
    return await countCollection("authors");
  },
  getCountPages: async () => {
    return await countCollection("pages");
  },
  getPostCountByYear: async (args) => {
    return await countCollection("posts", { year: args.year });
  },
  getAllSlugs: async () => {
    return await readAllSlugs();
  },
  getPostsWithThumb: async () => {
    return await getSemiPosts("posts");
  },
  getPagesWithThumb: async () => {
    return await getSemiPosts("pages");
  },
  getAllComments: async (args) => {
    return await readAllCollections("comments", args.row);
  },
  getAllLabels: async () => {
    return await readAllCollections("labels", "name");
  },
  getAllAuthors: async () => {
    return await readAllCollections("authors", "displayName");
  },
  getAllAuthorsUsernames: async () => {
    return await readAllCollections("authors", "username");
  },
  getAllFullPages: async () => {
    return await readAllCollections("pages");
  },
  getPostsOfLabel: async (args) => {
    return await getJoins("labels", "name", args.label, "posts");
  },
  getSemiPostsWithState: async (args) => {
    return await getSemiPosts("posts", { state: args.state });
  },
  getPostsbyAuthor: async (args) => {
    return await getJoins("authors", "name", args.username, "posts");
  },

  getRelatedPosts: async (args) => {
    let relatedPosts = [];
    const postLabels = await getPostAttributes(args.post, "labels");
    console.log(postLabels);

    for (const label of postLabels) {
      const uu = await getJoins("labels", "name", label.name, "posts");
      for (const y1 of uu) {
        console.log(y1);
        if (y1.slug !== args.post && !relatedPosts.includes(y1)) {
          relatedPosts.push(y1);
        }
      }
    }
    console.log(relatedPosts);
    return relatedPosts;
  },
  getPostsByYear: async (args) => {
    return await getSemiPosts("posts", { year: args.year });
  },
  deletePost: async (args) => {
    return await deleteItm("posts", { slug: args.slug });
  },
  deleteLabel: async (args) => {
    return await deleteItm("labels", { name: args.label });
  },
  deleteAuthor: async (args) => {
    return await deleteItm("authors", { name: args.username });
  },
  deleteLabelFromPost: async (args) => {
    return await deleteItmFromArray(
      "labels",
      { name: args.label },
      { slugs: args.slug }
    );
  },
  editPost: async (args) => {
    //need to correct the function
    const argKeys = Object.keys(args);
    const providedArgs = argKeys.filter((key) => args[key] !== undefined);
    const postResult = {};
    for (const key of providedArgs) {
      if (key === "author") {
        await updateItmInArray(
          "authors",
          { username: args.author },
          { slugs: args.oldSlug },
          { slugs: args.slug }
        );
      } else if (
        key === "slug" ||
        "title" ||
        "content" ||
        "date" ||
        "images" ||
        "status"
      ) {
        postResult[key] = args[key];
      } //else
      else if (key === "labels") {
        if (args[key]) {
          for (const labelName of args.labels) {
            await updateItmInArray(
              "labels",
              { name: labelName },
              { slugs: args.oldSlug },
              { slugs: args.slug }
            );
          }
        }
      }
    }
    let slugResult;

    if (args.slug) {
      if (args.oldSlug !== args.slug) {
        slugResult = {
          slug: args.slug,
          type: "posts",
        };
        if (args.author.name) {
          slugResult.authors = [args.author.name];
        }
        await updateItmPartially("slugs", "slug", args.oldSlug, slugResult);
      }
    }
    return await updateItmPartially("posts", "slug", args.oldSlug, postResult);
  },
  chnageUsrPass: async (args) => {
    return await pswStore(args.newPass, args.mail);
  },
  changePostStatus: async (args) => {
    const providedArgs = ["published", "draft", "trash"].filter(
      (key) => key === args.status
    );
    if (providedArgs) {
      return await updateItmPartially(
        "posts",
        { slug: args.slug },
        { state: args.status }
      );
    }
  },
};

const contextUser = {
  email: null,
};

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use("/auth", (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  const usr = authenticateToken(token);
  if (!usr) {
    contextUser.email = null;
    res.status(401).send("Forbidden Biatch");
  } else {
    contextUser.email = usr;
    res.status(200).send(contextUser.email);
  }
  next();
});

app.use("/signin", async (req, res, next) => {
console.log(req.body)
  if (!(req.body.password && req.body.mail)) {
    return res.status(403).send("enter both psw+mail");
  }
  const pass = req.body.password;
  const mail = req.body.mail;

  const isValid = await signinUsr(pass, mail);
  if (!isValid) {
    res.sendStatus(403);
  } else {
    res.status(200).json({ token: isValid });
  }
  next();
});

app.use(
  "/1", 
  async (req, res, next) => {
  
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);
    const usr = authenticateToken(token);
    if (!usr) {
      contextUser.email = null;
      return res.status(401).send("Forbidden Biatch");
    } else {
      contextUser.email = usr;
      const isRegistered = await countCollection("authors", { email: usr });
      if (!isRegistered || isRegistered < 1) {
        return res.status(401).send("Forged Token");
      }
    }
    next();
  },
  graphqlHTTP({
    schema: graphQL.schema,
    rootValue: root,
    graphiql: true,
    context: contextUser,
  })
);

app.use(
  "/graph",
  graphqlHTTP({
    schema: graphQL.schema,
    rootValue: root,
    graphiql: true,
    context: contextUser,
  })
);

async function validateUsr(token) {
  authenticateToken(token);
}

async function signinUsr(plainPass, email) {
  const passTrue = await pswValidate(plainPass, email);
  if (!passTrue) {
    return false;
  }
  contextUser.email = email;
  return generateAccessToken(email);
}
async function deleteItmFromArray(collection, query, itemToDelete) {
  await dbConnection.chnageCollection(collection);
  return await dbConnection.deleteFromArray(query, itemToDelete);
}

async function updateItmInArray(collection, query, itemToDelete, newItm) {
  await dbConnection.chnageCollection(collection);
  await dbConnection.deleteFromArray(query, itemToDelete);
  const queryKeys = Object.keys(query);
  const arrayName = Object.keys(itemToDelete);
  await dbConnection.pushNewItem(
    queryKeys[0],
    query[queryKeys[0]],
    arrayName[0],
    newItm[arrayName[0]]
  );
}

async function pswValidate(plainPass, email) {
  await dbConnection.chnageCollection("authors");
  const yy = await dbConnection.readData({ email: email }, "password");
console.log(yy)
if(yy.length < 1){return null}
  return await pswManagement.validatePass(plainPass, yy[0]["password"]);
}
async function pswStore(plainPass, email) {
  const pass = await pswManagement.hashNewPass(plainPass);
  await dbConnection.chnageCollection("authors");
  const yy = await dbConnection.updatePartially("email", email, {
    password: pass[0],
    salt: pass[1],
  });
  return yy;
}

async function deleteItm(type, query) {
  await dbConnection.chnageCollection(type);
  const yy = await dbConnection.deleteSingle(query);
  return yy;
}
async function updateItm(type, query, newData) {
  await dbConnection.chnageCollection(type);
  const yy = await dbConnection.updateData(query, newData);
  return yy;
}
async function updateItmPartially(type, key, val, newstuff) {
  await dbConnection.chnageCollection(type);
  const yy = await dbConnection.updatePartially(key, val, newstuff);
  return yy;
}
async function pushNewItems(type, key, val, newstuff) {
  const enteredKey = Object.keys(newstuff)[0];
  await dbConnection.chnageCollection(type);
  const yy = await dbConnection.pushNewItem(
    key,
    val,
    enteredKey,
    newstuff[enteredKey]
  );
  return yy;
}

async function getPostAttributes(post, attribute) {
  await dbConnection.chnageCollection(attribute);
  const yy = await dbConnection.search("slugs", post, "name");
  return yy;
}
async function readAllCollections(collection, row = null) {
  await dbConnection.chnageCollection(collection);
  let yy = [];
  if (row) {
    yy = await dbConnection.readData(null, row);
  } else {
    yy = await dbConnection.readData();
  }
  let all = [];
  if (row) {
    for (const itm of yy) {
      all.push(itm[row]);
    }
    return all;
  }
  return yy;
}
async function readAllSlugs() {
  await dbConnection.chnageCollection("slugs");
  const yy = await dbConnection.readData(null, "slug", "type");
  const all = [];
  for (const itm of yy) {
    all.push({ slug: itm.slug, type: itm.type });
  }
  return all;
}
async function getStuffOfThisPost(type, slug) {
  const all = [];
  await dbConnection.chnageCollection(type);
  let yy = null;
  if (type == "labels") {
    yy = await dbConnection.readData({ slugs: slug }, "name", "status");
  } else if (type == "authors") {
    yy = await dbConnection.readData(
      { slugs: slug },
      "displayName",
      "status",
      "username"
    );
  } else if (type == "comments") {
    yy = await dbConnection.readData(
      { slug: slug },
      "username",
      "date",
      "content",
      "status"
    );
  }
  for (const itm of yy) {
    if (type == "labels") {
      if (itm.status == "active") {
        all.push(itm.name);
      }
    } else if (type == "authors") {
      if (itm.status == "active") {
        all.push({ displayName: itm.displayName, username: itm.username });
      }
    } else if (type == "comments") {
      if (itm.status == "active") {
        all.push({
          username: itm.username,
          date: itm.date,
          content: itm.content,
        });
      }
    }
  }
  return all;
}

async function getFullSingle(type, slug) {
  await dbConnection.chnageCollection(type);
  const yy = await dbConnection.readDataSingle({ slug: slug });
  return yy;
}
async function getSlug(slug) {
  await dbConnection.chnageCollection("slugs");
  const yy = await dbConnection.readDataSingle({ slug: slug });
  return yy;
}

async function getSemiPosts(type, query = null) {
  await dbConnection.chnageCollection(type);
  const yy = await dbConnection.readData(
    query,
    "images",
    "slug",
    "title",
    "status"
  );
  return yy;
}

async function registerNewUser(mail, pass, username) {
  await dbConnection.chnageCollection("authors");
  const yy = await dbConnection.writeData({
    slugs: [],
    status: "active",
    email: mail,
    password: "mail",
    salt: "mail",
    username: username,
    displayName: username,
  });
  await pswStore(pass, mail);
  if (yy) {
    return "Successfully registered";
  }
}

async function writeNewPost(
  slug,
  title,
  content,
  labels,
  date,
  author,
  images,
  status
) {
  const blogPost = { ...graphQL.blogPost };
  blogPost.slug = slug;
  blogPost.title = title;
  blogPost.content = content;
  blogPost.date = date;
  if (status) {
    blogPost.status = status;
  }
  blogPost.images = images;
  await dbConnection.chnageCollection("posts");
  const yy = await dbConnection.writeData(blogPost);

  //await dbConnection.chnageCollection("labels");
  for (const _ in labels) {
    await pushNewItems("labels", "name", _, { slugs: slug });
  }

  //await dbConnection.chnageCollection("authors");
  await pushNewItems("authors", "username", author.name, { slugs: slug });
  await pushNewItems("slugs", "slug", slug, { slugs: slug });

  await dbConnection.chnageCollection("slugs");
  await dbConnection.writeData({
    slug: slug,
    authors: [author.name],
    type: "posts",
  });
  return yy[0];
}
async function addNewCommentDb(comment) {
  await dbConnection.chnageCollection("comments");
  return await dbConnection.writeData(comment);
}

async function countCollection(collection, search) {
  let yy = 0;
  if (search) {
    await dbConnection.chnageCollection(collection);
    const temps = await dbConnection.countQuery(search);
    if (temps) {
      yy = temps;
    }
  } else {
    await dbConnection.chnageCollection(collection);
    const temps = await dbConnection.countTotal();
    if (temps) {
      yy = temps;
    }
  }
  return yy;
}

async function getJoins(
  collection1,
  firstQueryKey,
  firstQueryValue,
  collection2
) {
  await dbConnection.chnageCollection(collection1);
  const firstQueryResults = await dbConnection.search(
    firstQueryKey,
    firstQueryValue
  );
  const allFound = [];
  if (firstQueryResults[0].slugs) {
    for (const res1 of firstQueryResults[0].slugs) {
      const post1 = await getSemiPosts(collection2, { slug: res1 });
      if (post1[0]) {
        allFound.push(post1[0]);
      }
    }
  }
  return allFound;
}

async function searchDb(collection, keyword, keys, ...returnValues) {
  await dbConnection.chnageCollection(collection);
  let searchResult = [];
  if (keys) {
    for (const key of keys) {
      const results = await dbConnection.search(key, keyword, ...returnValues);
      if (results) {
        for (const result of results) {
          if (!searchResult.find((res) => result === res)) {
            //continue;
            console.log(searchResult.find((res) => result === res));
            searchResult = searchResult.concat(result);
          }
        }
      }
    }
  }
  return searchResult;
}

async function tstFn() {
  const uu = await editPost();
  console.log(uu);
}
//tstFn();

app.listen(PORT, () => {
  console.log("Server fired up!");
});
