import {isInternalURL} from "@/util/isInternalURL";

const TESTS = [
  'https://auth.magic.link',
  'https://auth.magic.link/foo',
]

describe('isInternalURL', () => {

  it('basic ', () => {

    for(const test of TESTS) {
      expect(isInternalURL(test)).toEqual(true)
    }

  });

});
