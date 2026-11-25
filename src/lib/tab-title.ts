// SPDX-License-Identifier: AGPL-3.0-only
// [开源合规] 本文件为 Antiona 的定制新增文件，沿用上游 AGPL-3.0 许可证。
/**
 * [标签页提示] 离开标签页时改写标题，回来后恢复原标题。
 *
 * Astro 的 ClientRouter 会在站内导航后重新设置 `<title>`，所以真实标题不能只在初始化时
 * 记录一次：`astro:page-load` 时同步最新标题；若此时页面在后台，则继续显示提示语。
 */

/** 离开标签页时显示的标题（仅本模块使用）。 */
const DEFAULT_AWAY_TITLE = '🩷别走呀 · 记得回来';

/**
 * 根据可见性决定标题，纯函数便于测试。
 *
 * @param baseTitle 页面真实标题
 * @param hidden 页面是否在后台
 * @param awayTitle 后台提示标题
 */
export function resolveTabTitle(baseTitle: string, hidden: boolean, awayTitle: string): string {
  return hidden ? awayTitle : baseTitle;
}

/**
 * 监听页面可见性与站内导航，切换标签页标题。
 *
 * @param awayTitle 自定义后台提示标题
 * @returns 取消监听的函数
 */
export function setupTabTitle(awayTitle = DEFAULT_AWAY_TITLE): () => void {
  let baseTitle = document.title;

  const showAwayTitle = (): void => {
    if (baseTitle !== awayTitle) document.title = awayTitle;
  };

  const restoreTitle = (): void => {
    if (document.title === awayTitle) document.title = baseTitle;
  };

  const onVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      // 只在真实的页面标题上记录，避免重复触发时把提示语当成标题。
      if (document.title !== awayTitle) baseTitle = document.title;
      showAwayTitle();
      return;
    }
    restoreTitle();
  };

  const onPageLoad = (): void => {
    // ClientRouter 导航完成后 <title> 才是新页面的真实标题。
    if (document.title !== awayTitle) baseTitle = document.title;
    if (document.visibilityState === 'hidden') showAwayTitle();
  };

  document.addEventListener('visibilitychange', onVisibilityChange);
  document.addEventListener('astro:page-load', onPageLoad);

  return () => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
    document.removeEventListener('astro:page-load', onPageLoad);
  };
}
