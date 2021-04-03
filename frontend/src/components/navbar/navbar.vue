<template>
  <header>
    <nav>
      <h1>
        <router-link to="/home">CTE</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/auth">Log In</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@mixin flexCenter($justify) {
  display: flex;
  justify-content: $justify;
  align-items: center;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #3f3f3f;
  @include flexCenter(center);
  a {
    text-decoration: none;
    color: #cecece;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
  }
  nav {
    width: 90%;
    margin: auto;
    @include flexCenter(space-between);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    @include flexCenter(center);
  }
}
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #cecece;
}
h1 {
  margin: 0;
  a {
    color: white;
    margin: 0;
    &:hover,
    &:active,
    &.router-link-active {
      border-color: transparent;
    }
  }
}
li {
  margin: 0 0.5rem;
}
</style>
