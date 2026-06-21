import React from 'react';
import { ConfigDoc } from '@/types';
import { IoFlaskSharp } from 'react-icons/io5';

const docs: { [key: string]: ConfigDoc } = {
  'config.name': {
    title: '训练名称',
    description: (
      <>
        训练任务的名称。该名称将用于在系统中标识任务，并作为最终模型的文件名。名称必须唯一，只能包含字母数字字符、下划线和短横线，不允许空格或特殊字符。
      </>
    ),
  },
  gpuids: {
    title: 'GPU ID',
    description: (
      <>
        用于训练的 GPU。目前通过 UI 每个 job 一次只能使用一个 GPU。但是，您可以并行启动多个 job，每个 job 使用不同的 GPU。
      </>
    ),
  },
  'config.process[0].trigger_word': {
    title: '触发词',
    description: (
      <>
        可选：这将是用以触发您的概念或角色的词或标记。
        <br />
        <br />
        使用触发词时，如果您的标注不包含触发词，它会自动添加到标注的开头。如果您没有标注，标注将仅包含触发词。如果您想在标注中使用可变触发词并将其放在不同位置，可以在标注中使用{' '}
        <code>{'[trigger]'}</code> 占位符。它会自动替换为您的触发词。
        <br />
        <br />
        触发词不会自动添加到您的测试提示中，因此您需要手动添加触发词，或者在测试提示中也使用
        <code>{'[trigger]'}</code> 占位符。
      </>
    ),
  },
  'config.process[0].model.name_or_path': {
    title: '名称或路径',
    description: (
      <>
        Hugging Face 上 diffusers 仓库的名称，或您要从中训练的基础模型的本地路径。对于大多数模型，文件夹需要是 diffusers 格式。对于某些模型，如 SDXL 和 SD1，您可以在此处放入一体化 safetensors 检查点的路径。
      </>
    ),
  },
  'datasets.control_path': {
    title: '控制数据集',
    description: (
      <>
        控制数据集需要包含与训练数据集文件名匹配的文件。它们应该是匹配的文件对。这些图像在训练期间作为控制/输入图像提供。控制图像将被调整为与训练图像相同的大小。
      </>
    ),
  },
  'datasets.multi_control_paths': {
    title: '多控制数据集',
    description: (
      <>
        控制数据集需要包含与训练数据集文件名匹配的文件。它们应该是匹配的文件对。这些图像在训练期间作为控制/输入图像提供。
        <br />
        <br />
        对于多控制数据集，所有控制将按照列出的顺序依次应用。如果模型不要求图像具有相同的宽高比，例如 Qwen/Qwen-Image-Edit-2509，那么控制图像不需要匹配目标图像的尺寸或宽高比，它们会自动调整为模型/目标图像的理想分辨率。
      </>
    ),
  },
  'datasets.num_frames': {
    title: '帧数',
    description: (
      <>
        设置视频数据集中视频缩减到的帧数。如果此数据集是图像，请将此值设置为 1（即一帧）。如果您的数据集只有视频，将从数据集中的视频均匀间隔地提取帧。
        <br />
        <br />
        最好在训练前将视频修剪到合适的长度。Wan 是每秒 16 帧。81 帧将产生 5 秒的视频。因此，为了获得最佳效果，您应该将所有视频修剪到约 5 秒。
        <br />
        <br />
        例如：将此值设置为 81，并且数据集中有 2 个视频，一个 2 秒，一个 90 秒，将导致每个视频提取 81 个均匀间隔的帧，使 2 秒的视频显得很慢，90 秒的视频显得很快。
      </>
    ),
  },
  'datasets.do_i2v': {
    title: '图生视频',
    description: (
      <>
        对于可以同时处理 I2V（图生视频）和 T2V（文生视频）的视频模型，此选项将此数据集设置为 I2V 数据集进行训练。这意味着将从视频中提取第一帧作为视频的起始图像。如果未设置此选项，数据集将被视为 T2V 数据集。
      </>
    ),
  },
  'datasets.do_audio': {
    title: '音频',
    description: (
      <>
        对于支持视频音频的模型，此选项将从视频中加载音频并将其调整为与视频序列匹配。由于视频会自动调整大小，音频可能会降低或提高音高以匹配视频的新速度。在训练前准备好适当长度的数据集很重要。
      </>
    ),
  },
  'datasets.audio_normalize': {
    title: '音频归一化',
    description: (
      <>
        加载音频时，这会将音频音量归一化到最大峰值。如果您的数据集音量变化较大，这很有用。警告，如果您有想要保留的完全静音片段，请不要使用此选项，因为它会提高这些片段的音量。
      </>
    ),
  },
  'datasets.audio_preserve_pitch': {
    title: '保持音高',
    description: (
      <>
        加载音频以匹配请求的帧数时，如果长度与训练目标不匹配，此选项将保留音频的音高。建议使用与目标长度匹配的数据集，因为此选项可能会添加声音失真。
      </>
    ),
  },
  'datasets.flip': {
    title: '水平翻转和垂直翻转',
    description: (
      <>
        您可以通过翻转 x（水平）和/或 y（垂直）轴来即时增强数据集。翻转单个轴将有效地使您的数据集翻倍。这将导致在正常图像和图像的翻转版本上进行训练。这非常有用，但请记住它也可能具有破坏性。没有理由训练倒立的人，翻转面部可能会使模型混淆，因为人的右侧与左侧看起来并不相同。对于文本，显然翻转文本不是一个好主意。
        <br />
        <br />
        数据集的控制图像也会被翻转以匹配图像，因此它们在像素级别上始终匹配。
      </>
    ),
  },
  'train.unload_text_encoder': {
    title: '卸载文本编码器',
    description: (
      <>
        卸载文本编码器将缓存触发词和样本提示，并从 GPU 卸载文本编码器。数据集的标注将被忽略
      </>
    ),
  },
  'train.cache_text_embeddings': {
    title: '缓存文本嵌入',
    description: (
      <>
        <small>(实验性)</small>
        <br />
        缓存文本嵌入将处理并缓存来自文本编码器的所有文本嵌入到磁盘。文本编码器将从 GPU 卸载。这不适用于动态更改提示的内容，如触发词、标注丢弃等。
      </>
    ),
  },
  'model.multistage': {
    title: '训练阶段',
    description: (
      <>
        某些模型具有在去噪过程中分别训练和使用的多阶段网络。最常见的是有 2 个阶段，一个用于高噪声，一个用于低噪声。您可以选择同时训练两个阶段或分别训练。如果同时训练，训练器将每隔一定步数在训练每个模型之间交替，并输出 2 个不同的 LoRA。如果您选择只训练一个阶段，训练器将只训练该阶段并输出单个 LoRA。
      </>
    ),
  },
  'train.switch_boundary_every': {
    title: '切换频率',
    description: (
      <>
        当训练具有多个阶段的模型时，此设置控制训练器在训练每个阶段之间切换的频率。
        <br />
        <br />
        对于低显存设置，未训练的模型将从 GPU 卸载以节省内存。这需要一些时间，因此建议在使用低显存时减少切换频率。对于低显存设置，建议设置为 10 或 20。
        <br />
        <br />
        切换发生在批次级别，意味着它会在梯度累积步骤之间切换。要在单个步骤中训练两个阶段，请将切换频率设置为每 1 步切换，并将梯度累积设置为 2。
      </>
    ),
  },
  'train.force_first_sample': {
    title: '强制首次采样',
    description: (
      <>
        此选项将强制训练器在启动时生成样本。训练器通常只在没有训练任何内容时生成第一个样本，但从现有检查点恢复时不会进行首次采样。此选项强制训练器每次启动时都进行首次采样。如果您更改了样本提示并想立即查看新提示，这很有用。
      </>
    ),
  },
  'model.layer_offloading': {
    title: (
      <>
        层卸载{' '}
        <span className="text-yellow-500">
          ( <IoFlaskSharp className="inline text-yellow-500" name="实验性" /> 实验性)
        </span>
      </>
    ),
    description: (
      <>
        这是一个基于{' '}
        <a className="text-blue-500" href="https://github.com/lodstone-rock/RamTorch" target="_blank">
          RamTorch
        </a>
        的实验性功能。此功能尚处于早期阶段，会有许多更新和更改，因此请注意它可能在不同版本之间工作不一致。它也只适用于某些模型。
        <br />
        <br />
        层卸载使用 CPU RAM 而非 GPU RAM 来保存大部分模型权重。这允许在较小的 GPU 上训练更大的模型，前提是您有足够的 CPU RAM。这比在纯 GPU RAM 上训练慢，但 CPU RAM 更便宜且可升级。您仍然需要 GPU RAM 来保存优化器状态和 LoRA 权重，因此通常仍需要较大的显卡。
        <br />
        <br />
        您还可以选择要卸载的层的百分比。通常最好尽可能少地卸载（接近 0%）以获得最佳性能，但如果需要内存，可以卸载更多。
      </>
    ),
  },
  'model.qie.match_target_res': {
    title: '匹配目标分辨率',
    description: (
      <>
        此设置将使控制图像匹配目标图像的分辨率。Qwen-Image-Edit-2509 的官方推理示例以 1MP 分辨率提供控制图像，无论您生成什么大小。这样做会使低分辨率训练变得困难，因为无论目标图像多大，都会输入 1MP 控制图像。匹配目标分辨率将匹配目标的分辨率以输入控制图像，允许您在使用较小分辨率训练时使用更少的 VRAM。您仍然可以使用不同的宽高比，图像只会被调整为匹配目标图像中的像素数量。
      </>
    ),
  },
  'train.diff_output_preservation': {
    title: '差分输出保留',
    description: (
      <>
        差分输出保留（DOP）是一种在训练期间帮助保留训练概念类别的技术。为此，您必须设置一个触发词来区分您的概念及其类别。例如，您可能正在训练一位名叫 Alice 的女性。您的触发词可能是"Alice"。类别是"woman"，因为 Alice 是一位女性。我们想教模型在教它 Alice 有什么不同时，记住它对"woman"类别所知道的内容。在训练期间，训练器将在您的 LoRA 被绕过且提示中的触发词被替换为类别词的情况下进行预测。使"Alice 的照片"变成"woman 的照片"。此预测称为先验预测。每一步，我们将进行正常的训练步骤，但也会使用此先验预测和类别提示进行另一步骤，以教我们的 LoRA 保留类别的知识。这不仅应该提高您训练概念的性能，还应该允许您做诸如"Alice 站在一位 woman 旁边"这样的事情，而不会使两个人都看起来像 Alice。
      </>
    ),
  },
  'train.blank_prompt_preservation': {
    title: '空白提示词保留',
    description: (
      <>
        空白提示词保留（BPP）是一种在无提示时帮助保留当前模型知识的技术。这不仅有助于模型变得更加灵活，还有助于推理期间概念的质量，特别是当模型在推理时使用 CFG（分类器自由引导）时。在训练的每一步，都会使用空白提示和禁用的 LoRA 进行先验预测。然后，此预测被用作带有空白提示的额外训练步骤的目标，以在没有提示时保留模型的知识。这有助于模型不过拟合提示并保持其泛化能力。
      </>
    ),
  },
  'train.do_differential_guidance': {
    title: '差分引导',
    description: (
      <>
        差分引导将在训练期间放大模型预测与目标之间的差异以创建新目标。差分引导比例将是差异的倍率。这仍然是实验性的，但在我的测试中，它使模型训练更快，并且在我尝试过的每种场景中都能更好地学习细节。
        <br />
        <br />
        其理念是，正常训练会逐渐接近目标但永远无法真正到达，因为它受到学习率的限制。使用差分引导，我们放大差异以创建超出实际目标的新目标，这将使模型学习达到或超过目标，而不是落后。
        <br />
        <br />
        <img src="/imgs/diff_guidance.png" alt="差分引导示意图" className="max-w-full mx-auto" />
      </>
    ),
  },
  'dataset.num_repeats': {
    title: '重复次数',
    description: (
      <>
        重复次数允许您将数据集中的项目重复多次。当您使用多个数据集并希望平衡每个数据集的样本数量时，这很有用。例如，如果您有一个 10 张图像的小数据集和一个 100 张图像的大数据集，您可以将小数据集设置为重复 10 次，使其有效变为 100 张图像，使两个数据集在训练期间出现相同的次数。
      </>
    ),
  },
  'train.audio_loss_multiplier': {
    title: '音频损失倍率',
    description: (
      <>
        在训练音频和视频时，有时视频损失太大以至于超过了音频损失，导致音频失真。如果您注意到这种情况发生，可以增加音频损失倍率以给音频损失更多权重。您可以尝试 2.0、10.0 等。警告，设置过高可能会过拟合并损坏模型。
      </>
    ),
  },
  'datasets.auto_frame_count': {
    title: '自动帧数',
    description: (
      <>
        这将自动确定数据集中每个视频使用的帧数，而不是依赖固定的 num_frames。这允许您在数据集中包含不同长度的视频，每个视频将在不加速或减速的情况下处理。注意不要将长视频添加到数据集中，因为它们会消耗更多 VRAM。目前这不适用于批次大小大于 1 的情况。
      </>
    ),
  },
  'model.arch': {
    title: '模型架构',
    description: (
      <>
        选择要训练的基础模型架构。不同架构对应不同的模型，选择后会自动填充默认模型路径和推荐参数。支持图像（FLUX、Flex、Qwen-Image 等）、视频（Wan、LTX）和音频（ACE-Step）模型。
      </>
    ),
  },
  'model.low_vram': {
    title: '低显存',
    description: (
      <>
        启用低显存模式，通过层卸载等技术降低显存占用。适合显存不足的情况，但会降低训练速度。建议仅在显存不够时启用。
      </>
    ),
  },
  'model.quantize': {
    title: 'Transformer 量化',
    description: (
      <>
        设置 Transformer 模型的量化精度。量化可以大幅减少显存占用。float8 是默认推荐值，质量影响极小。更低比特（4bit、3bit）可进一步节省显存但会影响质量。部分模型支持精度恢复适配器（ARA）来补偿低比特量化的精度损失。
      </>
    ),
  },
  'model.quantize_te': {
    title: '文本编码器量化',
    description: (
      <>
        启用文本编码器的 8bit 量化。可以节省少量显存，对质量影响很小。建议开启。
      </>
    ),
  },
  'network.type': {
    title: '目标类型',
    description: (
      <>
        选择训练目标类型。LoRA 是标准的 LoRA 训练方式，适用于大多数场景。LoKr 是一种参数更少的替代方案，使用 Kronecker 积分解，适合显存有限的情况。
      </>
    ),
  },
  'network.lokr_factor': {
    title: 'LoKr 因子',
    description: (
      <>
        LoKr 的因子分解参数。值越大，表达能力越强但参数越多。通常 8-16 之间效果较好。
      </>
    ),
  },
  'network.linear': {
    title: '线性秩',
    description: (
      <>
        线性层的 LoRA 秩（Rank）。值越大，模型学习能力越强，但更容易过拟合，显存占用也更高。风格训练推荐 16，人物训练推荐 32-64，复杂概念可用 64-128。建议从 16 开始，效果不理想时再逐步增加。
      </>
    ),
  },
  'network.conv': {
    title: '卷积秩',
    description: (
      <>
        卷积层的 LoRA 秩。部分模型（如 FLUX 系列）不支持卷积秩。对于支持的模型，通常设置为与线性秩相同的值。
      </>
    ),
  },
  'save.dtype': {
    title: '数据类型',
    description: (
      <>
        保存权重的精度类型。BF16（推荐）平衡了精度和文件大小。FP16 兼容性更好。FP32 精度最高但文件最大。
      </>
    ),
  },
  'save.save_every': {
    title: '保存频率',
    description: (
      <>
        每训练多少步保存一次权重检查点。建议设置为总步数的 1/8 到 1/4。例如总步数 2000 时，设置为 250 或 500。保存的检查点可以用于比较不同训练阶段的效果。
      </>
    ),
  },
  'save.max_step_saves_to_keep': {
    title: '最大保存数',
    description: (
      <>
        保留的中间检查点数量。超出此数量后，最旧的检查点会被自动删除。建议设置为 4，既能比较不同阶段效果，又不会占用过多磁盘空间。
      </>
    ),
  },
  'train.batch_size': {
    title: '批次大小',
    description: (
      <>
        每次训练迭代处理的图片数量。值越大训练越稳定但显存占用越高。显存有限时设置为 1，配合梯度累积来达到等效的大批次效果。
      </>
    ),
  },
  'train.gradient_accumulation': {
    title: '梯度累积',
    description: (
      <>
        梯度累积步数。在显存有限时，可以通过梯度累积来模拟更大的批次大小。例如批次大小为 1、梯度累积为 4，等效于批次大小为 4 的训练效果。
      </>
    ),
  },
  'train.steps': {
    title: '步数',
    description: (
      <>
        总训练步数。步数越多训练越充分，但过多会导致过拟合。一般场景推荐 2000-4000 步。数据集较小时可以减少步数，数据集较大或概念复杂时可以增加步数。
      </>
    ),
  },
  'train.optimizer': {
    title: '优化器',
    description: (
      <>
        优化算法。AdamW8Bit（推荐）在保持效果的同时节省显存。AdamW 是标准优化器。Adafactor 适合大模型。Prodigy 可以自动调整学习率，适合不确定学习率设置的场景。
      </>
    ),
  },
  'train.lr': {
    title: '学习率',
    description: (
      <>
        模型参数更新的步长。太大导致训练不稳定，太小收敛缓慢。0.0001（1e-4）是大多数场景的通用值。可以尝试 0.0002（更快收敛）或 0.00005（更稳定）。
      </>
    ),
  },
  'train.weight_decay': {
    title: '权重衰减',
    description: (
      <>
        L2 正则化系数，用于防止过拟合。通常设置为 0.0001。如果训练过拟合严重，可以适当增大此值。
      </>
    ),
  },
  'train.timestep_type': {
    title: '时间步类型',
    description: (
      <>
        时间步采样策略。Sigmoid 是默认推荐值。Linear 是线性采样。Shift 适用于部分模型。Weighted 是加权采样，部分模型推荐使用。
      </>
    ),
  },
  'train.timestep_bias': {
    title: '时间步偏置',
    description: (
      <>
        时间步偏置类型。均衡表示均匀采样所有时间步。高噪声侧重高噪声阶段。低噪声侧重低噪声阶段。选择不同的偏置可以影响模型在不同噪声水平下的表现。
      </>
    ),
  },
  'train.loss_type': {
    title: '损失类型',
    description: (
      <>
        损失函数类型。均方误差（MSE）是默认值。平均绝对误差（MAE）对异常值更鲁棒。小波损失在频域上计算差异。
      </>
    ),
  },
  'train.ema_config.use_ema': {
    title: '使用 EMA',
    description: (
      <>
        启用指数移动平均（EMA）。EMA 通过维护模型参数的移动平均来平滑训练过程，可以提升最终模型的质量和稳定性。建议开启。
      </>
    ),
  },
  'train.ema_config.ema_decay': {
    title: 'EMA 衰减',
    description: (
      <>
        EMA 的衰减率。值越大，历史权重的影响越大，训练越平滑。0.99 是常用值。值过大会导致模型更新过慢。
      </>
    ),
  },
  'train.differential_guidance_scale': {
    title: '差分引导比例',
    description: (
      <>
        差分引导的强度倍率。值越大，训练越激进。建议从较小的值开始（如 1.0），观察训练效果后再调整。
      </>
    ),
  },
  'train.dop_loss_multiplier': {
    title: 'DOP 损失倍率',
    description: (
      <>
        差分输出保留（DOP）损失的权重倍率。控制正则化强度。通常设置为 1.0。值过大会影响训练效果。
      </>
    ),
  },
  'train.dop_preservation_class': {
    title: 'DOP 保留类别',
    description: (
      <>
        DOP 正则化使用的类别词。例如训练人物"Alice"时，类别可以设为"woman"。模型会学习在保留"woman"概念的同时区分出"Alice"的特征。
      </>
    ),
  },
  'train.bpp_loss_multiplier': {
    title: 'BPP 损失倍率',
    description: (
      <>
        空白提示词保留（BPP）损失的权重倍率。控制正则化强度。通常设置为 1.0。
      </>
    ),
  },
  'datasets.lora_weight': {
    title: 'LoRA 权重',
    description: (
      <>
        该数据集在训练中的权重。使用多个数据集时，可以通过调整权重来控制各数据集的重要性。值为 1.0 表示正常权重。
      </>
    ),
  },
  'datasets.default_caption': {
    title: '默认标注',
    description: (
      <>
        为没有标注文件的图片设置的默认描述文本。可以使用 [trigger] 占位符，它会被自动替换为触发词。例如 "a photo of [trigger]"。
      </>
    ),
  },
  'datasets.caption_dropout_rate': {
    title: '标注丢弃率',
    description: (
      <>
        训练时随机丢弃标注的概率。0.05 表示 5% 的概率丢弃标注。这有助于模型学习无条件生成能力，提升 CFG 引导效果。通常设置为 0.05-0.1。
      </>
    ),
  },
  'datasets.cache_latents_to_disk': {
    title: '缓存 Latents',
    description: (
      <>
        将图片的 VAE 编码结果缓存到磁盘，避免每次训练都重新编码。强烈推荐开启，可以显著加速训练。首次缓存需要额外时间，后续训练会直接读取缓存。
      </>
    ),
  },
  'datasets.is_regularization': {
    title: '正则化数据',
    description: (
      <>
        标记该数据集为正则化数据集。正则化数据用于防止模型过拟合和概念遗忘，帮助模型保持原有能力。正则化数据集通常使用与训练目标相关但不完全相同的图片。
      </>
    ),
  },
  'datasets.resolution': {
    title: '分辨率',
    description: (
      <>
        训练时使用的图片分辨率。可以选择多个分辨率，模型会学习适应不同尺寸的图片。AI Toolkit 使用桶（bucket）机制自动将不同尺寸的图片分组。推荐选择 512、768、1024 三个分辨率。
      </>
    ),
  },
  'sample.sample_every': {
    title: '采样频率',
    description: (
      <>
        每训练多少步生成一次样本图片。建议设置为 250，这样在 2000 步的训练中可以生成 8 次样本，足够观察训练进展。
      </>
    ),
  },
  'sample.sampler': {
    title: '采样器',
    description: (
      <>
        采样算法。FlowMatch 适用于 FLUX、Flex 等新模型。DDPM 适用于 SDXL、SD 1.5 等旧模型。通常选择模型后会自动设置正确的采样器。
      </>
    ),
  },
  'sample.guidance_scale': {
    title: '引导比例',
    description: (
      <>
        分类器自由引导（CFG）的比例。值越大，生成结果越遵循提示词，但多样性降低。FLUX/Flex 模型推荐 4，SDXL 推荐 6。
      </>
    ),
  },
  'sample.sample_steps': {
    title: '采样步数',
    description: (
      <>
        生成样本的推理步数。步数越多质量越高但速度越慢。通常 25-30 步即可获得良好效果。
      </>
    ),
  },
  'sample.width': {
    title: '宽度',
    description: (
      <>
        样本图片的宽度（像素）。通常设置为 1024。视频模型可以设置为 768。
      </>
    ),
  },
  'sample.height': {
    title: '高度',
    description: (
      <>
        样本图片的高度（像素）。通常设置为 1024。视频模型可以设置为 768。
      </>
    ),
  },
  'sample.fps': {
    title: '帧率',
    description: (
      <>
        视频模型的采样帧率（每秒帧数）。通常设置为 16 或 24。
      </>
    ),
  },
  'sample.seed': {
    title: '随机种子',
    description: (
      <>
        采样用的随机种子。相同种子加相同提示词会生成相同结果。设置为 42 是常用值。设为 -1 表示随机。
      </>
    ),
  },
  'sample.walk_seed': {
    title: '随机种子递增',
    description: (
      <>
        每次采样时递增随机种子。开启后每次采样会使用不同的种子，生成不同的样本图片，便于观察模型在不同场景下的表现。建议开启。
      </>
    ),
  },
  'sample.skip_first_sample': {
    title: '跳过首次采样',
    description: (
      <>
        跳过训练开始时的第一次采样。因为此时模型尚未训练，样本没有参考价值。从已有检查点恢复训练时建议开启。
      </>
    ),
  },
  'sample.disable_sampling': {
    title: '禁用采样',
    description: (
      <>
        完全禁用训练过程中的采样。可以加快训练速度。适合确认参数无误后的正式训练，或不需要实时查看训练效果时使用。
      </>
    ),
  },
};

export const getDoc = (key: string | null | undefined): ConfigDoc | null => {
  if (key && key in docs) {
    return docs[key];
  }
  return null;
};

export default docs;
