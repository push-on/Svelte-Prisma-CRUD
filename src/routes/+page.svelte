<script lang="ts">
  import type { PageData } from "./$types"
  export let data: PageData
  $: ({ articles } = data)
</script>

<div class="grid">
  <div>
    {#each articles as article}
      <h2>Posts</h2>
      <article>
        <header>{article.title}</header>
        <p>{article.content}</p>
				
        <form action="?/deleteArticle&id={article.id}" method="POST">
          <button class="outline">Delete Post</button>
          <a href="/{article.id}" role="button" class="outline secondary">edit</a>
        </form>
				
      </article>
    {/each}
  </div>
  <form action="?/createArticle" method="POST">
    <h3>New Post</h3>
    <label for="title">Title</label>
    <input type="text" name="title" id="title" placeholder="My Post Title" />
    <textarea id="content" name="content" rows={5} placeholder="Hello World" />
    <button type="submit">Submit</button>
  </form>
</div>
