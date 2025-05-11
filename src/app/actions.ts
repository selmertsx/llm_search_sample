"use server";

import { z } from "zod";
import { searchAndExtractInfo } from "../lib/searchAgent";
import { Message } from "@ai-sdk/ui-utils";

// Zodスキーマ: 利用企業のみを抽出
const UsedByCompaniesSchema = z.object({
  usedByCompanies: z
    .array(z.string())
    .describe(
      "このOSSライブラリを導入・使用していることが公表されている企業のリスト"
    ),
});

// プロンプトテンプレート: 初期検索用 (企業情報に特化)
const rawSearchPromptForCompanies = (itemName: string): string => {
  return `OSSライブラリ「${itemName}」について調査しています。特に、どのような企業がこのライブラリを導入・利用しているか、具体的な企業名や導入事例を中心に情報を集めてください。`;
};

// プロンプトテンプレート: 抽出用 (企業情報に特化)
const extractionPromptForCompanies = (
  itemName: string,
  rawText: string
): Message[] => {
  return [
    {
      id: "1",
      role: "user",
      content: `以下のテキストは、OSSライブラリ「${itemName}」に関する情報です。この中から、このライブラリを導入または利用していると明確にわかる企業名を全てリストアップしてください。

検索結果のテキスト:
${rawText}`,
    },
  ];
};

/**
 * 指定されたOSSライブラリを利用している企業のリストを取得するServer Action
 * @param libraryName 検索対象のOSSライブラリ名
 * @returns 企業のリスト、またはエラーメッセージを含むオブジェクト
 */
export async function getOssUsedByCompanies(
  libraryName: string
): Promise<string> {
  console.log(`[Action] Searching companies for library: ${libraryName}`);
  const result = await searchAndExtractInfo(
    libraryName,
    UsedByCompaniesSchema,
    rawSearchPromptForCompanies,
    extractionPromptForCompanies,
    "OssUsedByCompaniesAgent",
    "You are an AI assistant specialized in identifying companies that use specific open source software libraries." // Agent指示
  );

  return JSON.stringify(result.usedByCompanies);
}
