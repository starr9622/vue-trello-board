import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import ListTitle from "../components/List/ListTitle";
import { list } from "../store/modules";
import { cloneDeep } from "lodash";

describe("listTitle.vue 변경 테스트", () => {
  let localVue, store, wrapper;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      modules: { list: cloneDeep(list) },
    });
    store.dispatch("list/pushList");
    wrapper = shallowMount(ListTitle, {
      propsData: { board: store.state.list.all[0] },
      store,
      localVue,
    });
  });
  it("제목 생성 및 수정확인", () => {
    let input = wrapper.find("input");
    expect(input.element.value).toBe("new List !");
    input.element.value = "test~!";
    input.trigger("input");
    expect(store.state.list.all[0].title).toBe("test~!");
  });

  it("보드 삭제시 vuex 데이터 확인", () => {
    const div = wrapper.find(".remove-btn");
    div.trigger("click");
    expect(store.state.list.all.length).toBe(0);
  });
});
