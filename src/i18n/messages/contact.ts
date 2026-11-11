import type { Locale } from '../locales'

export type ContactSocialId = 'github' | 'discord' | 'x' | 'linkedin'

export type ContactPageCopy = {
  hero: {
    eyebrow: string
    title: string
    body: string
  }
  next: {
    title: string
    /** Exactly three steps, in order. */
    steps: {
      title: string
      body: string
    }[]
  }
  alternatives: {
    title: string
    newTabLabel: string
    security: {
      label: string
      body: string
    }
    docs: {
      label: string
      body: string
    }
    email: {
      label: string
      body: string
    }
    /** What each community channel is for; labels come from the shared social links. */
    social: Record<ContactSocialId, string>
  }
  form: {
    ariaLabel: string
    title: string
    body: string
    fields: {
      name: {
        label: string
        placeholder: string
      }
      email: {
        label: string
        placeholder: string
      }
      message: {
        label: string
        placeholder: string
      }
    }
    submit: string
    submitting: string
    success: string
    error: string
    /** Shown with a delivery error: send the same message from the visitor's mail app. */
    fallbackLead: string
    fallbackCta: string
    /** Label of the hidden anti-spam field (never shown to people). */
    honeypotLabel: string
    errors: {
      invalidEmail: string
      missingFields: string
      tooLong: string
      unavailable: string
    }
  }
}

export const contactPageCopy = {
  en: {
    hero: {
      eyebrow: 'Contact us',
      title: 'Bring us your goals. We bring the whole platform.',
      body: 'Tell us what you are building, which workflows you want to automate, or where AI is falling short today. We will put PrismShadow’s complete technology platform to work for your company, from data production and model training to private deployment and self-evolving agents, and stay with you until it delivers.',
    },
    next: {
      title: 'What happens next',
      steps: [
        {
          title: 'Every message gets our full attention',
          body: 'Our team reads each note personally and gets back to you promptly.',
        },
        {
          title: 'We map it out with you',
          body: 'Together we walk through your workflows, data and constraints, and pinpoint where AI will create the most value for your business.',
        },
        {
          title: 'We bring the complete platform',
          body: 'Data production, model training, private deployment and self-evolving agents: we put all of it behind your company and support you every step of the way to production.',
        },
      ],
    },
    alternatives: {
      title: 'Other ways to reach us',
      newTabLabel: 'opens in a new tab',
      security: {
        label: 'Security',
        body: 'Private deployment and agent controls',
      },
      email: {
        label: 'Email',
        body: 'contact@prismshadow.com',
      },
      docs: {
        label: 'Documentation',
        body: 'Get started with Panofy',
      },
      social: {
        github: 'Open-source projects',
        discord: 'Community and support',
        x: 'Product news',
        linkedin: 'Company updates',
      },
    },
    form: {
      ariaLabel: 'Contact form',
      title: 'Tell us what you need',
      body: 'A few lines are enough. We will reply to you personally.',
      fields: {
        name: {
          label: 'Name',
          placeholder: 'Your name',
        },
        email: {
          label: 'Email',
          placeholder: 'you@company.com',
        },
        message: {
          label: 'Message',
          placeholder: 'Your goals, your team, the workflows you want to improve…',
        },
      },
      submit: 'Send message',
      submitting: 'Sending...',
      success: 'Thank you! Your message is with our team, and we will be in touch soon to explore how PrismShadow can help your company.',
      error: 'Unable to send your message right now. Please try again.',
      fallbackLead: 'You can also send it from your own email app:',
      fallbackCta: 'Email contact@prismshadow.com',
      honeypotLabel: 'Leave this field empty',
      errors: {
        invalidEmail: 'Please enter a valid email address.',
        missingFields: 'Please fill in your name, email, and message.',
        tooLong: 'Please shorten your name, email, or message and try again.',
        unavailable: 'Contact submission is temporarily unavailable.',
      },
    },
  },
  zh: {
    hero: {
      eyebrow: '联系我们',
      title: '您的目标，我们全力以赴。',
      body: '无论您正在构建什么、希望自动化哪些工作流，还是当前的 AI 应用遇到了瓶颈，都欢迎告诉我们。PrismShadow 将把最完整的技术平台赋能给贵公司，从数据生产、模型训练、私有化部署到自进化 Agent，全程陪伴，直到真正落地见效。',
    },
    next: {
      title: '接下来会发生什么',
      steps: [
        {
          title: '每一条留言都会被认真对待',
          body: '我们的团队会亲自阅读您的每一条留言，并尽快与您联系。',
        },
        {
          title: '与您一起梳理需求',
          body: '我们会与您一起梳理业务流程、数据与约束条件，找到 AI 最能为贵公司创造价值的切入点。',
        },
        {
          title: '完整平台，全面赋能',
          body: '数据生产、模型训练、私有化部署与自进化 Agent，我们把完整的 PrismShadow 平台投入到贵公司的业务中，全程支持直至上线。',
        },
      ],
    },
    alternatives: {
      title: '其他联系方式',
      newTabLabel: '在新标签页打开',
      security: {
        label: '安全',
        body: '私有化部署与 Agent 安全控制',
      },
      email: {
        label: '邮箱',
        body: 'contact@prismshadow.com',
      },
      docs: {
        label: '文档',
        body: 'Panofy 快速上手',
      },
      social: {
        github: '开源项目',
        discord: '社区与支持',
        x: '产品动态',
        linkedin: '公司动态',
      },
    },
    form: {
      ariaLabel: '联系表单',
      title: '告诉我们您的需求',
      body: '简单几句即可，我们会亲自回复您。',
      fields: {
        name: {
          label: '姓名',
          placeholder: '您的姓名',
        },
        email: {
          label: '邮箱',
          placeholder: 'you@company.com',
        },
        message: {
          label: '留言',
          placeholder: '您的目标、团队，以及希望改进的工作流……',
        },
      },
      submit: '发送消息',
      submitting: '发送中...',
      success: '感谢您的留言！我们已经收到，会尽快与您联系，一起探讨 PrismShadow 如何助力贵公司。',
      error: '暂时无法发送消息，请稍后重试。',
      fallbackLead: '也可以用您自己的邮箱发送这条留言：',
      fallbackCta: '发邮件到 contact@prismshadow.com',
      honeypotLabel: '请勿填写此项',
      errors: {
        invalidEmail: '请输入有效的邮箱地址。',
        missingFields: '请填写姓名、邮箱和留言。',
        tooLong: '请缩短姓名、邮箱或留言后再试。',
        unavailable: '联系表单暂时不可用。',
      },
    },
  },
} satisfies Record<Locale, ContactPageCopy>
