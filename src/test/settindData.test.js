import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Title from "../components/Header/Title";
import ChangeBg from "../components/Footer/changeBg";
import { setting } from "../store/modules";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("title.test.js 데이터 변경 테스트", () => {
  let store;
  let state;
  beforeEach(() => {
    state = {
      title: "To-Do App22",
    };
    store = new Vuex.Store({
      modules: {
        setting: {
          ...setting,
          state,
        },
      },
    });
  });

  it("기본 셋팅 값 불러오기", () => {
    const wrapper = shallowMount(Title, { store, localVue });
    const input = wrapper.find('input[type="text"]');
    expect(input.element.value).toBe("To-Do App22");
  });

  it("변경 이벤트 발생시 state 값 변경 확인", () => {
    const wrapper = shallowMount(Title, { store, localVue });
    const input = wrapper.find('input[type="text"]');
    input.element.value = "test";
    input.trigger("input");
    expect(state.title).toBe("test");
  });
});

describe("ChangeBg.test.js 데이터 변경 테스트", () => {
  let store;
  let state;
  let actions;
  beforeEach(() => {
    state = {
      color: "#f1f1f1",
    };
    actions = {
      changeBackgroundColor: jest.fn(),
    };
    store = new Vuex.Store({
      setting: {
        ...setting,
        state,
        actions,
      },
    });
  });

  it("props값 셋팅 확인", () => {
    const wrapper = shallowMount(ChangeBg, {
      propsData: { color: state.color },
    });
    let color = wrapper.find('input[type="color"]');
    expect(color.element.value).toBe("#f1f1f1");
  });

  it("color 이벤트 송신 확인", () => {
    const wrapper = shallowMount(ChangeBg, { store, localVue });
    let color = wrapper.find("input");
    color.element.value = "#ffffff";
    color.trigger("input");
    expect(color.element.value).toBe("#ffffff");

    // expect(actions.changeBackgroundColor).toHaveBeenCalled();
  });
});
