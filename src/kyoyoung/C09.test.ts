import slugify from 'slugify'
import { describe, expect, test } from 'vitest'

describe('slugify 함수에 옵션이 주어지지 않았을 때,',()=>{
    test('주어진 첫번째 인자의 단어사이 빈 공백을 없애고 `-`로 연결해서 반환한다.',()=>{
        const result = slugify('hello world')
        expect(result).toBe('hello-world')
    })
})

describe('slugify 함수에 옵션이 주어질 때,',()=>{
    test('두번째 인자로 문자열이 주어진다면 첫번째 인자로 주어진 문자열의 단어사이 빈 공백을 없애고, 두번째 인자값으로 연결해서 반환한다.',()=>{
        const result = slugify('hello world','*')
        expect(result).toBe('hello*world')
    })

    test('옵션의 replacement 값이 주어진다면 첫번째 인자로 주어진 문자열의 빈공백을 없애고 replacement값으로 연결해서 반환한다.',()=>{
        const result = slugify('hello world',{replacement:'*'})
        expect(result).toBe('hello*world')
    })

    test('옵션의 remove 값이 주어진다면 첫번째 인자로 주어진 문자열에서 remove값에 해당하는 문자열을 제거하고 반환한다.',()=>{
        const result = slugify('hello world',{remove:/l/g})
        expect(result).toBe('heo-word')
    })

    test('옵션의 lower 값이 true로 주어진다면 반환되는 문자열을 소문자로 반환한다.',()=>{
        const result = slugify('HELLO WORLD',{lower:true})
        expect(result).toBe('hello-world')
    })

    test('옵션의 strict 값이 true로 주어진다면 반환되는 문자열에서 replacement를 제외한 특수문자를 제거한다.',()=>{
        const result = slugify('hello** world',{strict:true})
        expect(result).toBe('hello-world')
    })

    test('옵션의 locale 값이 주어진다면 반환되는 문자열을 locale에 맞게 변환한다.',()=>{
        const result = slugify('&',{locale:'sv'})
        expect(result).toBe('och')
    })

    test('옵션의 trim 값이 `false`라면 양끝 공백을 제거하지 않고 replacement로 대체한다.',()=>{ 
        const result = slugify(' hello ',{trim:false})
        expect(result).toBe('-hello-')
    })

    test('unicode를 문자열로 대체할 수 있다.',()=>{
        const result = slugify('unicode ♥') // unicode-love
        expect(result).toBe('unicode-love')
    })

    test('지원하지 않는 unicode는 extends를 통해 추가할 수 있다.',()=>{
        slugify.extend({'☢': 'radioactive'})
        const result =slugify('unicode ☢') 
        expect(result).toBe('unicode-radioactive')


    })
    
})
