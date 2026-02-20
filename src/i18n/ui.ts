export const languages = {
    en: 'English',
    zh: '中文',
};

export const defaultLang = 'en';

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.about': 'About',

        'hero.title': 'Zelin Li.',
        'hero.subtitle': 'Engineering systems. Crafting experiences.',
        'hero.btn.featured': 'Featured Work',
        'hero.btn.resume': 'Resume ↗',

        'intro.headline': 'Software Developer & AI Researcher.',
        'intro.body.1': 'Based at the ',
        'intro.body.university': 'University of Minnesota (M.S. in Computer Science)',
        'intro.body.2': '.',
        'intro.body.3': 'Passionate about building highly-scalable ',
        'intro.body.systems': 'Systems',
        'intro.body.4': ', developing ',
        'intro.body.ai': 'LLM Agents',
        'intro.body.5': ', and creating products with exceptional user experiences. Currently seeking Software Development Engineering Internships for 2026.',

        'projects.headline': 'Selected Projects.',
        'projects.subheadline': 'A look at some of my recent technical deep dives.',

        'project.1.title': 'EasyLocomo & Muse Framework',
        'project.1.tech': 'Python, PyTorch, LLMs',
        'project.1.desc': 'Engineered "EasyLocomo" by unifying 5 LLM interfaces (OpenAI, Anthropic, etc.) into a cohesive API wrapper. Slashed dependency overhead by 95% and benchmarked SOTA AI agents across 1,300+ long-horizon interaction events for the upcoming "Muse" paper.',
        'project.1.link': 'View on GitHub >',

        'project.2.title': 'Offline-First Todo CI/CD',
        'project.2.tech': 'Java, Spring Boot, React',
        'project.2.desc': 'Migrated an MVP into a robust Spring Boot architecture with an IndexedDB Sync Manager for offline conflict resolution. Built a cross-arch CI/CD pipeline with GitHub Actions and Docker.',
        'project.2.link': 'View on GitHub >',

        'project.3.title': 'Auto-Chronicle Gaokao',
        'project.3.tech': 'Python, Agent Architecture',
        'project.3.desc': 'Constructed a 120-week narrative state machine and multi-agent classroom framework to simulate the Chinese Gaokao progression with causal consistency.',
        'project.3.link': 'View on GitHub >',

        'project.4.title': 'Real-Time Fall Detection System',
        'project.4.tech': 'Python, YOLO, OpenCV, SQLite',
        'project.4.desc': 'Optimized a YOLO-based detection algorithm, boosting accuracy from 42% to 88%. Architected a real-time surveillance processing pipeline for HIK streams using OpenCV, complete with SQLite logging and a modular tracking logic.',
        'project.4.link': 'View on GitHub >',

        'footer.branding.title': 'playeriv65',
        'footer.branding.subtitle': 'Design. Code. Create.',
        'footer.connect': 'Connect',
        'footer.projects': 'Projects',
        'footer.legal.copyright': `Copyright © ${new Date().getFullYear()} Zelin Li. All rights reserved.`,
        'footer.legal.privacy': 'Privacy Policy',
        'footer.legal.terms': 'Terms of Use',
    },
    zh: {
        'nav.home': '首页',
        'nav.projects': '项目',
        'nav.about': '关于',

        'hero.title': '李泽林。',
        'hero.subtitle': '构建系统架构，淬炼用户体验。',
        'hero.btn.featured': '精选项目',
        'hero.btn.resume': '简历 ↗',

        'intro.headline': '软件开发工程师 & AI 研究员。',
        'intro.body.1': '现就读于',
        'intro.body.university': '明尼苏达大学 (计算机科学硕士)',
        'intro.body.2': '。',
        'intro.body.3': '热衷于构建高可用的',
        'intro.body.systems': '后端系统',
        'intro.body.4': '、开发',
        'intro.body.ai': '大模型 (LLM) 智能体',
        'intro.body.5': '，以及打造拥有极致交互体验的产品。目前正在寻找 2026 年的软件开发实习机会。',

        'projects.headline': '精选项目。',
        'projects.subheadline': '近期技术深度探索的部分成果展示。',

        'project.1.title': 'EasyLocomo & Muse 测试基准',
        'project.1.tech': 'Python, PyTorch, LLMs',
        'project.1.desc': '开发了 "EasyLocomo" 框架，将 OpenAI、Anthropic 等 5 种大模型接口统一封装，包依赖减少 95%。在此基础上，为即将发表的 "Muse" 论文在 1300+ 个长序列交互事件中对最前沿的 AI 智能体进行了基准测试。',
        'project.1.link': '在 GitHub 上查看 >',

        'project.2.title': '离线优先 Todo 及其 CI/CD',
        'project.2.tech': 'Java, Spring Boot, React',
        'project.2.desc': '利用 Spring Boot 重构了原型系统，并设计了基于 IndexedDB 的同步管理器来解决离线冲突。通过 GitHub Actions 和 Docker 搭建了支持跨架构架构 (ARM64/x86) 的持续集成流水线。',
        'project.2.link': '在 GitHub 上查看 >',

        'project.3.title': '高考自动编年史 (ACG Engine)',
        'project.3.tech': 'Python, Agent 架构',
        'project.3.desc': '构建了包含 120 周跨度的叙事状态机与多智能体班级模拟框架，以此来推演中国高考进程，并保证了百万字级衍生文本的因果一致性。',
        'project.3.link': '在 GitHub 上查看 >',

        'project.4.title': '实时跌倒检测监控系统',
        'project.4.tech': 'Python, YOLO, OpenCV, SQLite',
        'project.4.desc': '优化了基于 YOLO 的目标检测算法，将跌倒检测的准确率从 42% 提升至 88%。利用 OpenCV 为海康威视视频流设计了多线程实时处理管道，并实现了基于 SQLite 的日志记录模块。',
        'project.4.link': '在 GitHub 上查看 >',

        'footer.branding.title': 'playeriv65',
        'footer.branding.subtitle': '设计 · 编码 · 创造',
        'footer.connect': '联系我',
        'footer.projects': '项目链接',
        'footer.legal.copyright': `Copyright © ${new Date().getFullYear()} Zelin Li. 保留所有权利。`,
        'footer.legal.privacy': '隐私政策',
        'footer.legal.terms': '使用条款',
    },
} as const;
