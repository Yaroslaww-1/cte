import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface IState {
    count: number;
  }

  // provide typings for `this.$store`
  interface IComponentCustomProperties {
    $store: Store<IState>;
  }
}
