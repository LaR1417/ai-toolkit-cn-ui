# AI Toolkit WebUI 中文汉化版

> 基于 [Ostris AI Toolkit](https://github.com/ostris/ai-toolkit) 的完整中文界面翻译版本。

AI Toolkit 是一个易于使用的扩散模型训练套件，支持图像、视频、音频等多种模型的 LoRA 训练。本项目在其基础上对 WebUI 进行了完整的中文汉化，让中文用户能够更方便地使用。

## 汉化内容

- **全界面中文翻译**：仪表盘、新建任务、队列、数据集、设置等所有页面
- **表单标签汉化**：所有训练参数的标签、按钮、提示信息均已翻译为中文
- **帮助提示系统**：为 44 个训练选项添加了中文帮助提示（点击问号图标查看）
- **新增帮助文档**：为原本没有说明的 40 个选项新增了详细的中文使用说明

## 支持的模型

### 图像生成
- FLUX.1 / FLUX.2 / FLUX.2-klein
- Flex.1 / Flex.2
- Chroma / Lumina2
- Qwen-Image / Qwen-Image-2512
- HiDream / OmniGen2
- Z-Image Turbo / Z-Image / Z-Image De-Turbo
- SDXL / SD 1.5

### 图像编辑
- FLUX.1-Kontext-dev
- Qwen-Image-Edit / Qwen-Image-Edit-2509 / Qwen-Image-Edit-2511
- HiDream E1

### 视频生成
- Wan 2.1 (1.3B / 14B / I2V)
- Wan 2.2 (14B / I2V / TI2V 5B)
- LTX-2 / LTX-2.3

### 音频生成
- ACE-Step 1.5 XL / ACE-Step 1.5

## 快速开始

### macOS（一键脚本）

```bash
git clone https://github.com/LaR1417/ai-toolkit-cn-ui.git
cd ai-toolkit-cn-ui
chmod +x run_mac.zsh
./run_mac.zsh
```

### Windows / Linux

```bash
git clone https://github.com/LaR1417/ai-toolkit-cn-ui.git
cd ai-toolkit-cn-ui
python -m venv venv

# Windows
.\venv\Scripts\activate
# Linux
source venv/bin/activate

pip install --no-cache-dir torch==2.9.1 torchvision==0.24.1 torchaudio==2.9.1 --index-url https://download.pytorch.org/whl/cu128
pip install -r requirements.txt

cd ui
npm install
npm run build_and_start
```

启动后访问 **http://localhost:8675** 即可打开中文 WebUI。

## 系统要求

| 项目 | 要求 |
|------|------|
| Python | >= 3.10（推荐 3.12） |
| GPU | NVIDIA GPU，显存 >= 16GB（FLUX.1 训练需 >= 24GB） |
| Node.js | > 20（仅 WebUI 需要） |
| 操作系统 | Linux / Windows / macOS（macOS 为实验性支持） |

## 汉化文件清单

主要修改的文件：

- `ui/src/app/jobs/new/SimpleJob.tsx` - 训练任务创建表单（标签、按钮、提示）
- `ui/src/docs.tsx` - 帮助提示内容（44 个选项的中文说明）
- `ui/src/components/Sidebar.tsx` - 侧边栏导航
- `ui/src/components/GPUWidget.tsx` - GPU 监控组件
- `ui/src/components/JobsTable.tsx` - 任务队列表格
- `ui/src/components/JobOverview.tsx` - 任务概览
- `ui/src/components/JobActionBar.tsx` - 任务操作按钮
- `ui/src/app/jobs/new/options.ts` - 下拉选项
- `ui/src/app/settings/page.tsx` - 设置页面
- `ui/src/app/datasets/page.tsx` - 数据集页面
- `ui/src/app/dashboard/page.tsx` - 仪表盘页面
- `ui/src/app/jobs/page.tsx` - 队列页面
- `ui/src/app/jobs/[jobID]/page.tsx` - 任务详情页面

## 致谢

- 原项目：[Ostris AI Toolkit](https://github.com/ostris/ai-toolkit) by [@ostris](https://github.com/ostris)
- 感谢 Ostris 开发了这个优秀的开源扩散模型训练工具

## License

本项目遵循原项目的开源协议。
