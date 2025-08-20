import { describe, it, expect } from "vitest";
import { getAPIKey } from "./auth.js";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("should return null when no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null when authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer sometoken"
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null when authorization header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey" // Missing the actual key
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null when authorization header is just whitespace after ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey   " // Only whitespace after ApiKey
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return the API key when authorization header is properly formatted", () => {
    const apiKey = "test-api-key-123";
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey ${apiKey}`
    };
    expect(getAPIKey(headers)).toBe(apiKey);
  });

  it("should return the API key even when there are extra spaces", () => {
    const apiKey = "test-api-key-123";
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey   ${apiKey}   `
    };
    expect(getAPIKey(headers)).toBe(apiKey);
  });
});