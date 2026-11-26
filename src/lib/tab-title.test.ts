// SPDX-License-Identifier: AGPL-3.0-only
// [开源合规] 本文件为 Antiona 的定制新增测试文件，沿用上游 AGPL-3.0 许可证。
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { resolveTabTitle } from './tab-title';

describe('resolveTabTitle', () => {
  it('returns the away title while the tab is hidden', () => {
    assert.equal(resolveTabTitle('文章 · 小站', true, '•̩̩̩̩ᯅ•̩̩̩'), '•̩̩̩̩ᯅ•̩̩̩');
  });

  it('restores the real page title when the tab is visible', () => {
    assert.equal(resolveTabTitle('文章 · 小站', false, '•̩̩̩̩ᯅ•̩̩̩'), '文章 · 小站');
  });
});
