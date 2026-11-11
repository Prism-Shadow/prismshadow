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
      eyebrow: 'Contact',
      title: 'Talk to PrismShadow',
      body: 'Share what you are building, what needs to be automated, or where your current AI workflow is getting stuck.',
    },
    next: {
      title: 'What happens next',
      steps: [
        {
          title: 'We read your note',
          body: 'The PrismShadow team reviews every message.',
        },
        {
          title: 'We follow up',
          body: 'We reply by email and set up a conversation with the right people on our side.',
        },
        {
          title: 'We start with one workflow',
          body: 'Bring one workflow. We show you how PrismShadow trains, deploys and keeps improving the agents that run it.',
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
      title: 'Send a message',
      body: 'The PrismShadow team will review your note and follow up.',
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
          placeholder: 'Tell us about your project, team, or workflow.',
        },
      },
      submit: 'Send message',
      submitting: 'Sending...',
      success: 'Message sent. We will get back to you soon.',
      error: 'Unable to send your message right now. Please try again.',
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
      eyebrow: '联系',
      title: '联系 PrismShadow',
      body: '告诉我们你正在构建什么、希望自动化哪些工作流，或者当前 AI 工作流卡在了哪里。',
    },
    next: {
      title: '接下来会发生什么',
      steps: [
        {
          title: '我们会阅读你的留言',
          body: 'PrismShadow 团队会认真查看每一条消息。',
        },
        {
          title: '我们会尽快跟进',
          body: '我们会通过邮件回复，并安排合适的同事与你沟通。',
        },
        {
          title: '从一个工作流开始',
          body: '带来一个工作流，我们演示 PrismShadow 如何训练、部署并持续优化执行它的 Agent。',
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
      title: '发送消息',
      body: 'PrismShadow 团队会查看你的留言并尽快跟进。',
      fields: {
        name: {
          label: '姓名',
          placeholder: '你的姓名',
        },
        email: {
          label: '邮箱',
          placeholder: 'you@company.com',
        },
        message: {
          label: '留言',
          placeholder: '简单描述你的项目、团队或工作流。',
        },
      },
      submit: '发送消息',
      submitting: '发送中...',
      success: '消息已发送，我们会尽快回复。',
      error: '暂时无法发送消息，请稍后重试。',
      errors: {
        invalidEmail: '请输入有效的邮箱地址。',
        missingFields: '请填写姓名、邮箱和留言。',
        tooLong: '请缩短姓名、邮箱或留言后再试。',
        unavailable: '联系表单暂时不可用。',
      },
    },
  },
} satisfies Record<Locale, ContactPageCopy>
