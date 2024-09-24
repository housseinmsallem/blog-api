const bcryptjs = require('bcryptjs');
const prisma = require('../lib/client');

async function main() {
  const hashedPassword = await bcryptjs.hash('hahaha', 10);
  console.log(hashedPassword);
  // Upsert a post with author association
  const author = await prisma.reader.upsert({
    where: { email: 'houssein.moslem@gmail.com' },
    update: {
      password: hashedPassword,
      isAdmin: true,
      username: 'TacoWithaTwist',
    },
    create: {
      email: 'houssein.moslem@gmail.com',
      username: 'TacoWithaTwist',
      password: hashedPassword,
      isAdmin: true,
    },
  });
  const post = await prisma.post.upsert({
    where: { id: 1 },
    update: {
      title: 'i am developper yess',
      content: 'very',
      authorId: author.id,
    },
    create: {
      title: 'i am developper yess',
      content: 'very',
      authorId: author.id,
    },
  });
  console.log(post);
  // Upsert a comment associated with the post and author
  const comment = await prisma.comment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      content: 'hello i am comment',
      author: {
        connect: { email: 'houssein.moslem@gmail.com' }, // Connect to the existing author
      },
      post: {
        connect: { id: post.id }, // Connect to the created post
      },
    },
  });

  // No need to upsert the Reader again since it's already handled in the post upsert
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
