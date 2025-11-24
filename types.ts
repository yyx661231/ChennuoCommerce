import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureDetail {
  label: string;
  text: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  priceValue: string;
  description: string;
  icon: React.ReactNode;
  details: FeatureDetail[];
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface ProductItem {
  id: number;
  title: string;
  category: string;
  priceTag: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
  detailedProducts?: string[];
}
