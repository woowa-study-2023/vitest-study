import {describe, expect, test} from "vitest";
import {getCommand} from "../sampleCode/C06/parse";
import {AGENTS} from "../sampleCode/C06/agents";

//given when then

describe('getCommand 테스트', ()=>{
    test('지원하지 않는 agent 입력 시 Unsupported agent "${agent}" 에러가 출력되는가?', ()=>{
     const agent = 'gmin'
    const command = 'install'
    expect(()=> getCommand(agent, command).toThrowError(`Unsupported agent "${agent}"`))
  }),
    test('지원하지 않는 command 입력 시 `Command "${command}" is not support by agent "${agent}"` 에러가 출력 되는가?', () => {
      const agent = Object.keys(AGENTS)[0]; // 가장 첫번째 agent를 가져옵니다.
      const command = 'gmin';
      expect(()=> getCommand(agent, command).toThrowError(`Command "${command}" is not support by agent "${agent}"`))
    });
    test('함수형 외의 명령어 입력 시 명령어 포맷이 잘 되는가?', () => {
      const agent = 'agent';
      const command = 'command';
      const args = ['arg1', 'arg2', 'arg3'];

      AGENTS[agent] = {[command] : 'test formatting command {0}'}
      const result = getCommand(agent, command, args);

      expect(result).stringMatching('test formatting command ' + args.join(' '));
    });
})

