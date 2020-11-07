const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    if (node.internal.type === 'JavascriptFrontmatter') {
        console.log(`Node created of type "${node.internal.type}"`);
        // const fileNode = getNode(node.parent);
        const slug = createFilePath({node, getNode, basePath: `mockups`});
        createNodeField({node, name:`slug`, value: slug})
    }
}