const data = require("./data.json");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("qraphql");

const quoteModel = require("./quoteModel");

const myDocument = new GraphQLObjectType({
  name: "myDocument",
  fields: () => ({
    id: { type: GraphQLID },
    quotation: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
});

const documentQuery = new GraphQLObjectType({
  name: "documentQuery",
  fields: {
    getQuotes: {
      type: new GraphQLList(myDocument),
      resolve: () => {
        return quoteModel.find();
      },
    },

    getQuote: {
      type: myDocument,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, args) => {
        const { id } = args;
        return quoteModel.findById(id);
      },
    },
  },
});

const mutateDocument = new GraphQLObjectType({
  name: "mutateDocument",
  fields: {
    createQuote: {
      type: myDocument,
      args: {
        quotation: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { quotation, quthor } = args;

        return quoteModel.create({
          quotation,
          quthor,
        });
      },
    },

    updateQuote: {
      type: myDocument,
      args: {
        id: { type: GraphQLID },
        quotation: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { id, quotation } = args;

        return quoteModel.findByIdAndUpdate(
          id,
          {
            quotation,
          },
          { new: true }
        );
      },
    },

    deleteQuote: {
      type: myDocument,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, args) => {
        const { id } = args;

        return quoteModel.findByIdAndDelete(id);
      },
    },
  },
});
