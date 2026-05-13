import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import BannerSection from '~/components/section/Banner.vue'
import { BANNERS } from '~/constants'

describe('BannerSection', () => {
  it('renders the component', async () => {
    const wrapper = await mountSuspended(BannerSection)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct number of slides', async () => {
    const wrapper = await mountSuspended(BannerSection)
    const slides = wrapper.findAll('[data-testid="slide"]')
    expect(slides.length).toBe(BANNERS.length)
  })

  it('first slide starts with offset 0', async () => {
    const wrapper = await mountSuspended(BannerSection)
    const active = wrapper.find('[data-testid="slide"][data-offset="0"]')
    expect(active.exists()).toBe(true)
  })

  it('clicking next sets next slide to active', async () => {
    const wrapper = await mountSuspended(BannerSection)
    const nextBtn = wrapper.find('[data-testid="btn-next"]')
    await nextBtn.trigger('click')
    const active = wrapper.find('[data-testid="slide"][data-offset="0"]')
    expect(active.attributes('data-index')).toBe('1')
  })

  it('clicking prev sets last slide to active ', async () => {
    const wrapper = await mountSuspended(BannerSection)
    const prevBtn = wrapper.find('[data-testid="btn-prev"]')
    await prevBtn.trigger('click')
    const active = wrapper.find('[data-testid="slide"][data-offset="0"]')
    expect(active.attributes('data-index')).toBe(String(BANNERS.length - 1))
  })

  it('clicking next then prev returns to the first slide', async () => {
    const wrapper = await mountSuspended(BannerSection)
    await wrapper.find('[data-testid="btn-next"]').trigger('click')
    await wrapper.find('[data-testid="btn-prev"]').trigger('click')
    const active = wrapper.find('[data-testid="slide"][data-offset="0"]')
    expect(active.attributes('data-index')).toBe('0')
  })

  it('only one slide has offset 0 at any time', async () => {
    const wrapper = await mountSuspended(BannerSection)
    await wrapper.find('[data-testid="btn-next"]').trigger('click')
    const actives = wrapper.findAll('[data-testid="slide"][data-offset="0"]')
    expect(actives.length).toBe(1)
  })
})
