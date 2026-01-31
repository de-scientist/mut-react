/**
 * Centralized Sharing Utility
 * Supports individual and bulk sharing with multiple platforms and methods
 */

interface ShareData {
  title: string;
  text: string;
  url?: string;
  files?: File[];
}

interface ShareOptions {
  method?: 'native' | 'clipboard' | 'email' | 'download' | 'platform';
  platform?: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'telegram';
  subject?: string;
  body?: string;
  filename?: string;
}

interface ShareableItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  [key: string]: any;
}

class SharingHelper {
  private static readonly BASE_URL = window.location.origin;

  /**
   * Share content using native Web Share API or fallback methods
   */
  static async share(data: ShareData, options: ShareOptions = {}): Promise<void> {
    const { method = 'native', platform, subject, body, filename } = options;

    try {
      switch (method) {
        case 'native':
          await this.shareNative(data);
          break;
        case 'clipboard':
          await this.shareToClipboard(data);
          break;
        case 'email':
          await this.shareViaEmail(data, { subject, body });
          break;
        case 'download':
          await this.shareAsDownload(data, filename);
          break;
        case 'platform':
          if (platform) {
            await this.shareToSocialPlatform(data, platform);
          } else {
            throw new Error('Platform must be specified for platform sharing');
          }
          break;
        default:
          throw new Error(`Unsupported sharing method: ${method}`);
      }
    } catch (error) {
      console.error('Error sharing content:', error);
      throw new Error(`Failed to share content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Native Web Share API (preferred method)
   */
  private static async shareNative(data: ShareData): Promise<void> {
    if (!navigator.share) {
      throw new Error('Web Share API not supported on this device');
    }

    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
        files: data.files
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        throw error;
      }
      // User cancelled sharing - don't treat as error
    }
  }

  /**
   * Copy to clipboard as fallback
   */
  private static async shareToClipboard(data: ShareData): Promise<void> {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API not supported');
    }

    const content = data.url ? `${data.text}\n\n${data.url}` : data.text;
    
    try {
      await navigator.clipboard.writeText(content);
      this.showNotification('Content copied to clipboard!', 'success');
    } catch (error) {
      throw new Error('Failed to copy to clipboard');
    }
  }

  /**
   * Share via email
   */
  private static async shareViaEmail(
    data: ShareData, 
    options: { subject?: string; body?: string } = {}
  ): Promise<void> {
    const subject = options.subject || data.title;
    const body = options.body || `${data.text}${data.url ? `\n\n${data.url}` : ''}`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoUrl, '_blank');
  }

  /**
   * Share as downloadable file
   */
  private static async shareAsDownload(data: ShareData, filename?: string): Promise<void> {
    const content = data.url ? `${data.text}\n\n${data.url}` : data.text;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  /**
   * Share to specific social media platforms
   */
  private static async shareToSocialPlatform(data: ShareData, platform: string): Promise<void> {
    const {  text, url } = data;
    const shareUrl = url || this.BASE_URL;
    
    let platformUrl = '';
    
    switch (platform.toLowerCase()) {
      case 'twitter':
        platformUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        platformUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        platformUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
        break;
      case 'telegram':
        platformUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
    
    window.open(platformUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Share multiple items (bulk sharing)
   */
  static async shareBulk(
    items: ShareableItem[],
    options: ShareOptions & { 
      itemFormatter?: (item: ShareableItem) => string;
      includeUrls?: boolean;
      bulkTitle?: string;
    } = {}
  ): Promise<void> {
    const { 
      itemFormatter, 
      includeUrls = true,
      bulkTitle = 'Shared Items',
      ...shareOptions 
    } = options;

    if (!items.length) {
      throw new Error('No items to share');
    }

    // Format items for sharing
    const formattedItems = items.map(item => {
      if (itemFormatter) {
        return itemFormatter(item);
      }
      
      let itemText = `${item.title}`;
      if (item.description) {
        itemText += `\n${item.description}`;
      }
      if (includeUrls && item.url) {
        itemText += `\n${item.url}`;
      }
      
      return itemText;
    });

    const shareText = `${bulkTitle}\n\n${formattedItems.join('\n\n---\n\n')}`;
    
    await this.share({
      title: bulkTitle,
      text: shareText,
      url: this.BASE_URL
    }, shareOptions);
  }

  /**
   * Share individual item with customizable formatting
   */
  static async shareItem(
    item: ShareableItem,
    options: ShareOptions & {
      formatTemplate?: (item: ShareableItem) => { title: string; text: string; url?: string };
    } = {}
  ): Promise<void> {
    const { formatTemplate, ...shareOptions } = options;

    let shareData: ShareData;

    if (formatTemplate) {
      const formatted = formatTemplate(item);
      shareData = {
        title: formatted.title,
        text: formatted.text,
        url: formatted.url
      };
    } else {
      shareData = {
        title: item.title,
        text: item.description || item.title,
        url: item.url
      };
    }

    await this.share(shareData, shareOptions);
  }

  /**
   * Generate shareable URL for an item
   */
  static generateShareableUrl(
    itemType: string,
    itemId: string,
    baseUrl?: string
  ): string {
    const base = baseUrl || this.BASE_URL;
    return `${base}/${itemType}/${itemId}`;
  }

  /**
   * Check if sharing capabilities are available
   */
  static getSharingCapabilities(): {
    nativeShare: boolean;
    clipboard: boolean;
    fileDownload: boolean;
  } {
    return {
      nativeShare: !!navigator.share,
      clipboard: !!navigator.clipboard,
      fileDownload: typeof document !== 'undefined' && typeof URL !== 'undefined'
    };
  }

  /**
   * Get available sharing methods based on device capabilities
   */
  static getAvailableMethods(): Array<{ value: string; label: string; icon?: string }> {
    const capabilities = this.getSharingCapabilities();
    const methods = [];

    if (capabilities.nativeShare) {
      methods.push({ value: 'native', label: 'Share', icon: 'share' });
    }

    if (capabilities.clipboard) {
      methods.push({ value: 'clipboard', label: 'Copy to Clipboard', icon: 'clipboard' });
    }

    methods.push(
      { value: 'email', label: 'Share via Email', icon: 'email' },
      { value: 'download', label: 'Download as File', icon: 'download' }
    );

    return methods;
  }

  /**
   * Get available social platforms
   */
  static getAvailablePlatforms(): Array<{ value: string; label: string; icon?: string }> {
    return [
      { value: 'twitter', label: 'Twitter', icon: 'twitter' },
      { value: 'facebook', label: 'Facebook', icon: 'facebook' },
      { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
      { value: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp' },
      { value: 'telegram', label: 'Telegram', icon: 'telegram' }
    ];
  }

  /**
   * Show notification (helper method)
   */
  private static showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  /**
   * Helper method for common admin data sharing
   */
  static prepareShareData<T extends Record<string, any>>(
    items: T[],
    // title: string,
    options: {
      itemTitleField?: keyof T;
      itemDescriptionField?: keyof T;
      itemUrlField?: keyof T;
      baseUrl?: string;
      itemType?: string;
    } = {}
  ): ShareableItem[] {
    const {
      itemTitleField = 'title' as keyof T,
      itemDescriptionField = 'description' as keyof T,
      itemUrlField = 'id' as keyof T,
      baseUrl = this.BASE_URL,
      itemType = 'item'
    } = options;

    return items.map(item => ({
      id: String(item.id || ''),
      title: String(item[itemTitleField] || ''),
      description: item[itemDescriptionField] ? String(item[itemDescriptionField]) : '',
      url: item[itemUrlField] ? 
        (typeof item[itemUrlField] === 'string' && item[itemUrlField].startsWith('http') ? 
          String(item[itemUrlField]) : 
          `${baseUrl}/${itemType}/${item[itemUrlField]}`) : 
        undefined,
      ...item
    }));
  }
}

export default SharingHelper;
export type { ShareData, ShareOptions, ShareableItem };
